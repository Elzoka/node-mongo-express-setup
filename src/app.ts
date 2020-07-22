import express from 'express';
import { Server } from 'http';

import routes from './routes';
import log from './utils/logger';

const app = express();

// middleware

// setup routes
app.use(routes);

interface StartServerOptions {
  port?: string | number;
}

export async function startServer({ port }: StartServerOptions = {}): Promise<
  Server
> {
  port = port && Number(port);

  if (!port) {
    process.exit(1);
    // log
  }

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve(server);
      log.info(`Server is running on port ${port}`);
    });
  });
}

export default app;
