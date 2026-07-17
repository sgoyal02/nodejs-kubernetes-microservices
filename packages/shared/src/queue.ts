import { QUEUE_NAME } from './constants/jobs.constants';
import { redis } from './redis';

export const pushToQueue = async (jobId: string): Promise<void> => {
  await redis.lpush(QUEUE_NAME, jobId);
};

export const popFromQueue = async (): Promise<string | null> => {
  return await redis.brpoplpush(QUEUE_NAME, 'processing-jobs', 5); //5sec-tym out
};
