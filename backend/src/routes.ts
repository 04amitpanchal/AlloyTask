import express, { Request, Response } from 'express';
import * as axios from 'axios';
import passport from 'passport';
import { sign } from 'jsonwebtoken';
import * as slack from './workflow/integration/slack';
import * as shopify from './workflow/integration/shopify';
import User from './model/user';
import Trigger from './model/trigger';
import { deleteTrigger, createTrigger } from './trigger';

const router = express.Router();

router.get('/signup', async (req: Request, res: Response) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.firstName ||
      !req.body.lastName
    ) {
      res.status(400).send('Pass all required params.');
      return;
    }

    const email = req.body.email.toLowerCase();
    const exists = await User.findOne({ email });

    if (exists) {
      res.status(400).send('Email exists.');
      return;
    }

    const password = req.body.password;
    if (!password.length) {
      return res.status(400).send('Invalid password');
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    try {
      await user.save();
      const access_token = sign(
        {
          user: user._id,
        },
        process.env.JWT_SECRET!
      );

      return res.status(200).send({
        accessToken: 'JWT ' + access_token,
        user: user,
      });
    } catch (err) {
      res.status(400).send('Problem signing up!');
      return;
    }
  } catch (err) {
    res.status(400).send(err);
    return;
  }
});

router.get('/login', async (req: Request, res: Response) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  if (!email || !password) {
    return res.status(500).send('Pass email and password both');
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Cant find user.');
    }

    user.comparePwd(req.body.password, async (err, match) => {
      if (match && !err) {
        const access_token = sign(
          {
            user: user._id,
          },
          process.env.JWT_SECRET!
        );

        return res.status(200).send({
          accessToken: 'JWT ' + access_token,
          user: user,
        });
      } else {
        return res.status(400).send('Invalid Password');
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
    return;
  }
});

router.get('/slack', passport.authenticate('jwt', { session: false }), slack);

router.get(
  '/shopify',
  passport.authenticate('jwt', { session: false }),
  shopify
);

router.get(
  '/workflow/activate',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const user = await User.findOne({ _id: req.user });
    if (!user) {
      return res.status(400).send('Illegal Call');
    }
    const activated = await createTrigger(req.user);
    if (activated) {
      const trigger = new Trigger({
        userId: req.user,
        triggerId: activated,
      });
      trigger.save();
      return res.status(200).send('Activated!');
    } else {
      return res.status(400).send('Something went wrong.');
    }
  }
);

router.get(
  '/workflow/deactivate',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const user = await User.findOne({ _id: req.user });
    if (!user) {
      return res.status(400).send('you are not logged in');
    }
    const deactivated = await deleteTrigger(req.user);
    if (deactivated) {
      await Trigger.findByIdAndDelete({ userId: req.user });
      return res.status(200).send('Deactivated!');
    } else {
      return res.status(400).send('Something went wrong.');
    }
  }
);

router.post(
  '/workflow/trigger',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const data = req.body;
    const webHookId = req.headers['X-Shopify-Webhook-Id'];
    const trigger = Trigger.findOne({ triggerId: webHookId });
    if (trigger) {
      if (data.order && Number(data.order.total_price) > 100) {
        const user = await User.findOne({ _id: req.user });
        if (user) {
          const slackAppData = user.getSlackDataData();
          if (slackAppData.slackToken && slackAppData.slackId) {
            const slackData = {
              token: slackAppData.slackToken,
              channel: slackAppData.slackId,
              text: `Your order with id: ${data.order.id}, has crossed limit of 100 dollar.`,
            };

            const options: axios.AxiosRequestConfig = {
              method: 'POST',
              url: 'https://slack.com/api/chat.postMessage',
              data: slackData,
            };

            await axios.default.request(options);
            return res.status(200);
          }
        }
      }
    } else {
      console.log('Error no trigger found');
    }
  }
);

export default router;
