import dotenv from 'dotenv';
import { connectRedis } from '@nodejs-kubernetes-microservices/shared/src';
import { startWorker } from './worker';

dotenv.config();

const start = async () => {
  await connectRedis();
  startWorker();
};

start().catch(console.error);
