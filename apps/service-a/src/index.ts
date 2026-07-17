import { connectRedis } from '@nodejs-kubernetes-microservices/shared/src';
import { app } from './app';
import { env } from './config/env';

const start = async () => {
  await connectRedis();

  app.listen(env.port, () => {
    console.log(`service-A running on port ${env.port}`);
  });
};

start().catch(console.error);
