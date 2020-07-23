import { startServer } from './app';
import { setupMongoose } from '(utils)/db';
import log from '(utils)/logger';
import config from '(config)';

async function bootstrap(): Promise<void> {
  try {
    const cleanupMongoose = await setupMongoose(config.MONGODB_URI);
    const server = await startServer({
      port: config.PORT,
    });

    server.on('close', cleanupMongoose);
  } catch (err) {
    // TODO: handle errors better and log to file
    log.error('error is thrown while spinning up the server');
    process.exit(1);
  }
}

bootstrap();
