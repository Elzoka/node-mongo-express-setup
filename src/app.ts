import express from 'express';
import { Server } from 'http';

import routes from '(routes)';
import log from '(utils)/logger';

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
    // log
    log.error(`Port variable doesn't exist`);

    // exit
    process.exit(1);
  }

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      log.info(`Server is running on port ${port}`);
      resolve(server);
    });
  });
}

export default app;
