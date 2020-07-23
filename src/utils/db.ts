import mongoose, { Mongoose } from 'mongoose';
import log from '(utils)/logger';

const connectDB = (uri: string): Promise<Mongoose> => {
  return mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((error) => {
      // TODO: add better logging
      log.error('There is a problem connecting mongoose to mongodb');
      log.error(error);

      return Promise.reject(error);
    });
};

type CleanupFunction = () => void;

export const setupMongoose = async (URI: string): Promise<CleanupFunction> => {
  if (process.env['MONGODB_DEBUG']) {
    mongoose.set('debug', true);
  }

  if (!URI) {
    throw new Error('Please add Mongodb URI to connect to');
  }
  await connectDB(URI);
  log.info(`connected to mongodb running on ${URI}`);

  return function cleanup(): void {
    mongoose.connection.close();
  };
};
