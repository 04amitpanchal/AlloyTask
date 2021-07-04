import express from 'express';
const bodyParser = require('body-parser');
import { connect } from './db';
import routes from './routes';
import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use('/api', routes);

connect().then(() => {
  try {
    app.listen(process.env.port || 3000, () => {
      console.log('App is listening on: 3000');
    });
  } catch (err) {
    console.log(err);
  }
});
