import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const URI = process.env.CONNECTION_URI;

const dbConnect = async () => {
  mongoose.connect(
    URI!,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log('Mongo CONNECTED!');
    }
  );

  mongoose.connection.on('connected', () => {
    console.log('Connected');
  });

  mongoose.connection.on('error', (err) => {
    console.log(`Error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected');
  });
};

export const connect = async () => {
  dbConnect()
    .then(() => {
      return 'Connected';
    })
    .catch((err) => console.log(err));
};
