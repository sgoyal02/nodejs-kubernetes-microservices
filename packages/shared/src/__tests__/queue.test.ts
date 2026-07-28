import { describe, it, expect, vi, beforeEach } from 'vitest';
import { pushToQueue, popFromQueue } from '../queue';
import { redis } from '../redis';
import { QUEUE_NAME } from '../constants/jobs.constants';

vi.mock('../redis', () => ({
  redis: {
    lpush: vi.fn(),
    brpoplpush: vi.fn(),
  },
}));
describe('shared queue def testing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('push to queue- tests', () => {
    it('test- push job id in queue', async () => {
      const jobId = 'job-123';
      vi.mocked(redis.lpush).mockResolvedValue(1);
      await pushToQueue(jobId);
      expect(redis.lpush).toHaveBeenCalledWith(QUEUE_NAME, jobId);
    });

    it('test- throw error on redis lpush fail', async () => {
      const jobId = 'job-123';
      vi.mocked(redis.lpush).mockRejectedValue(new Error('Redis error'));
      await expect(pushToQueue(jobId)).rejects.toThrow('Redis error');
      expect(redis.lpush).toHaveBeenCalledWith(QUEUE_NAME, jobId);
    });
  });

  describe('pop from queue- tests', () => {
    it('test- return job id from process queue', async () => {
      const jobId = 'job-123';
      vi.mocked(redis.brpoplpush).mockResolvedValue(jobId);
      const result = await popFromQueue();
      expect(result).toBe(jobId);
      expect(redis.brpoplpush).toHaveBeenCalledWith(QUEUE_NAME, 'processing-jobs', 5);
    });

    it('test- return null if queue timeout', async () => {
      vi.mocked(redis.brpoplpush).mockResolvedValue(null);
      const result = await popFromQueue();
      expect(result).toBeNull();
      expect(redis.brpoplpush).toHaveBeenCalledWith(QUEUE_NAME, 'processing-jobs', 5);
    });

    it('test- throw error on redis brpoplpush fail', async () => {
      vi.mocked(redis.brpoplpush).mockRejectedValue(new Error('Redis connection failed'));
      await expect(popFromQueue()).rejects.toThrow('Redis connection failed');
    });
  });
});
