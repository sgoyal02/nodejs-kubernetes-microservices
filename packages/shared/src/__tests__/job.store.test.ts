import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitJob, getJob, updateJob } from '../job.store';
import { redis } from '../redis';
import { pushToQueue } from '../queue';
import { JOB_PREFIX } from '../constants/jobs.constants';
import { Job } from '../types';

vi.mock('../redis', () => ({
  redis: {
    hset: vi.fn(),
    hgetall: vi.fn(),
    incr: vi.fn(),
  },
}));
vi.mock('../queue', () => ({
  pushToQueue: vi.fn(),
}));
describe('shared job store-- testing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('submit job- tests', () => {
    it('save job, push in queue, incr submit counter- test', async () => {
      const job: Job = {
        id: '123',
        type: 'sort-array',
        payload: { numbers: [3, 2, 1] },
        status: 'pending',
        createdAt: '2026-07-28',
      };

      vi.mocked(redis.hgetall).mockResolvedValue({});

      await submitJob(job);

      expect(redis.hset).toHaveBeenCalledWith(`${JOB_PREFIX}${job.id}`, {
        id: job.id,
        type: job.type,
        payload: JSON.stringify(job.payload),
        status: job.status,
        createdAt: job.createdAt,
      });
      expect(pushToQueue).toHaveBeenCalledWith(job.id);
      expect(redis.incr).toHaveBeenCalledWith('stats:jobs:submitted');
    });
  });

  describe('get job- test', () => {
    it('should return null if job does not exist', async () => {
      vi.mocked(redis.hgetall).mockResolvedValue({});
      const result = await getJob('1');
      expect(result).toBeNull();
    });

    it('return parsed job - test', async () => {
      vi.mocked(redis.hgetall).mockResolvedValue({
        id: '1',
        type: 'sort-array',
        payload: JSON.stringify({ numbers: [1, 2, 3] }),
        status: 'completed',
        createdAt: 'today',
        completedAt: 'later',
        result: JSON.stringify({ success: true }),
        processTime: '125',
      });

      const result = await getJob('1');
      expect(result).toEqual({
        id: '1',
        type: 'sort-array',
        payload: { numbers: [1, 2, 3] },
        status: 'completed',
        createdAt: 'today',
        completedAt: 'later',
        result: { success: true },
        processTime: 125,
        error: undefined,
      });
    });
    it('return null for undefined data- test', async () => {
      vi.mocked(redis.hgetall).mockResolvedValue(undefined as never);
      const result = await getJob('1');
      expect(result).toBeNull();
    });
  });

  describe('update job- tests', () => {
    it('update input fields- test', async () => {
      await updateJob('1', {
        status: 'completed',
        result: { ok: true },
        processTime: 55,
      });
      expect(redis.hset).toHaveBeenCalledWith(`${JOB_PREFIX}1`, {
        status: 'completed',
        result: JSON.stringify({ ok: true }),
        processTime: 55,
      });
    });

    it('stringify payload-test', async () => {
      await updateJob('1', {
        payload: { foo: 'bar' },
      });
      expect(redis.hset).toHaveBeenCalledWith(`${JOB_PREFIX}1`, {
        payload: JSON.stringify({ foo: 'bar' }),
      });
    });
    it('handle empty updates- test', async () => {
      await updateJob('1', {});
      expect(redis.hset).toHaveBeenCalledWith(`${JOB_PREFIX}1`, {});
    });
  });
});
