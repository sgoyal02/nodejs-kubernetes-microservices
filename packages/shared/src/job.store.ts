import { JOB_PREFIX } from './constants/jobs.constants.js';
import { pushToQueue } from './queue.js';
import { redis } from './redis';
import { Job, JobStatus, JobType } from './types';

export const submitJob = async (job: Job): Promise<void> => {
  const key = `${JOB_PREFIX}${job.id}`;
  await redis.hset(key, {
    id: job.id,
    type: job.type,
    payload: JSON.stringify(job.payload || {}),
    status: job.status,
    createdAt: job.createdAt,
  });

  const data = await redis.hgetall(key);
  await pushToQueue(job.id);
  await redis.incr('stats:jobs:submitted'); //for stats-service
};

export const getJob = async (jobId: string): Promise<Job | null> => {
  const key = `${JOB_PREFIX}${jobId}`;
  const data = await redis.hgetall(key);
  if (!data || Object.keys(data).length === 0) return null;

  return {
    id: data.id,
    type: data.type as JobType,
    payload: data.payload ? JSON.parse(data.payload) : null,
    status: data.status as JobStatus,
    createdAt: data.createdAt,
    completedAt: data.completedAt,
    result: data.result ? JSON.parse(data.result) : undefined,
    error: data.error,
    processTime: data.processTime ? Number(data.processTime) : undefined,
  };
};

export const updateJob = async (jobId: string, updates: Partial<Job>): Promise<void> => {
  const key = `${JOB_PREFIX}${jobId}`;
  //   const data: Record<string, string | number | undefined> = { ...updates }; //err type
  const data: Record<string, string | number> = {};

  if (updates.id !== undefined) data.id = updates.id;
  if (updates.type !== undefined) data.type = updates.type;
  if (updates.status !== undefined) data.status = updates.status;
  if (updates.createdAt !== undefined) data.createdAt = updates.createdAt;
  if (updates.completedAt !== undefined) data.completedAt = updates.completedAt;
  if (updates.error !== undefined) data.error = updates.error;
  if (updates.processTime !== undefined) data.processTime = updates.processTime;

  if (updates.result !== undefined) data.result = JSON.stringify(updates.result);
  if (updates.payload !== undefined) data.payload = JSON.stringify(updates.payload);

  await redis.hset(key, data);
};
