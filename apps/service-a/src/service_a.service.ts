import { Job } from '@nodejs-kubernetes-microservices/shared/src';
import { redisClient } from './redis/client';
import { v4 } from 'uuid';

const QUEUE_NAME = 'job:queue';

export async function createJob(): Promise<Job> {
  const job: Job = {
    id: v4(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  await redisClient.hset(`job:${job.id}`, job);
  await redisClient.lpush(QUEUE_NAME, job.id);
  return job;
}
