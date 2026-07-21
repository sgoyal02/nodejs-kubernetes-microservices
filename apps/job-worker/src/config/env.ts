import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3001,
  workerName: process.env.WORKER_NAME || 'default',
};
