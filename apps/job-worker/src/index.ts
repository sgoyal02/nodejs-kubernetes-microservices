import { connectRedis } from '../../../packages/shared/src';
import { app } from './app';
import { env } from './config/env';
import { startWorker } from './worker';

const start = async () => {
  await connectRedis();
  console.log('worker redis connected');

  app.listen(env.port, () => {
    console.log(`job worker running on port ${env.port}`);
  });
  startWorker();
};

start().catch(console.error);
