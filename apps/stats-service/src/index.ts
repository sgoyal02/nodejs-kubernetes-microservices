import { connectRedis } from '@nodejs-kubernetes-microservices/shared';
import { app } from './app';
import { env } from './config/env';

const start = async (): Promise<void> => {
  await connectRedis();
  console.log('stats-service: redis connection');

  app.listen(env.port, () => {
    console.log(`stats service running on port ${env.port}`);
  });
};

start().catch(console.error);
