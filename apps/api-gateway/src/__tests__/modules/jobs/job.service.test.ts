import { beforeEach, describe, expect, it, vi } from 'vitest';
import { JobService } from '../../../modules/jobs/job.service';
import type { Job } from '@nodejs-kubernetes-microservices/shared/src';
import { getJob, submitJob } from '@nodejs-kubernetes-microservices/shared/src';
import { v4 } from 'uuid';

//mocks--
vi.mock('@nodejs-kubernetes-microservices/shared/src', () => ({
  submitJob: vi.fn(),
  getJob: vi.fn(),
}));
vi.mock('uuid', () => ({
  v4: vi.fn(),
}));
const mockedSubmitJob = vi.mocked(submitJob);
const mockedGetJob = vi.mocked(getJob);
const mockedUuid = vi.mocked(v4 as unknown as () => string);

describe('Job service APIs-testing', () => {
  let jobService: JobService;
  beforeEach(() => {
    vi.clearAllMocks();
    jobService = new JobService();
    mockedUuid.mockReturnValue('testjob-id');
  });

  describe('job create-tests', () => {
    it('create and submit job success-test', async () => {
      mockedSubmitJob.mockResolvedValue(undefined);
      const result = await jobService.createJob('calculate-primes', { limit: 100000 });

      expect(result).toEqual({
        id: 'testjob-id',
        type: 'calculate-primes',
        payload: { limit: 100000 },
        status: 'pending',
        createdAt: expect.any(String),
      });
      expect(mockedSubmitJob).toHaveBeenCalledTimes(1);
      expect(mockedSubmitJob).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'testjob-id',
          type: 'calculate-primes',
          status: 'pending',
        })
      );
    });

    it('job create empty payload-test', async () => {
      mockedSubmitJob.mockResolvedValue(undefined);
      const result = await jobService.createJob('bcrypt-hash');
      expect(result.payload).toBeNull();
      expect(result.status).toBe('pending');
      expect(mockedSubmitJob).toHaveBeenCalledOnce();
    });
  });

  describe('job status-tests', () => {
    it('job return on exist- test', async () => {
      const mockJob: Job = {
        id: 'testjob-id',
        type: 'calculate-primes',
        payload: { limit: 100000 },
        status: 'completed',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        result: {
          value: 100,
        },
      };
      mockedGetJob.mockResolvedValue(mockJob);
      const result = await jobService.getJobStatus('testjob-id');
      expect(result).toEqual(mockJob);
      expect(mockedGetJob).toHaveBeenCalledWith('testjob-id');
    });

    it('job return null on not exist-test', async () => {
      mockedGetJob.mockResolvedValue(null);
      const result = await jobService.getJobStatus('invalid-id');
      expect(result).toBeNull();
      expect(mockedGetJob).toHaveBeenCalledWith('invalid-id');
    });
  });
});
