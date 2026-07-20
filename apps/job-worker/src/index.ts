import dotenv from 'dotenv';
import { startWorker } from './worker';
import { connectRedis } from '@nodejs-kubernetes-microservices/shared';

dotenv.config();

const start = async () => {
  await connectRedis();
  startWorker();
};

start().catch(console.error);
