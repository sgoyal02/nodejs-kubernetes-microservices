import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Request, Response } from 'express';
import type { Job } from '@nodejs-kubernetes-microservices/shared/src';

//mocking--
const { mockedCreateJob, mockedGetJobStatus, mockedJobService } = vi.hoisted(() => {
  const mockedCreateJob = vi.fn();
  const mockedGetJobStatus = vi.fn();
  const mockedJobService = {
    createJob: mockedCreateJob,
    getJobStatus: mockedGetJobStatus,
  };

  return {
    mockedCreateJob,
    mockedGetJobStatus,
    mockedJobService,
  };
});
vi.mock('../../../modules/jobs/job.service', () => ({
  JobService: class {
    createJob = mockedJobService.createJob;
    getJobStatus = mockedJobService.getJobStatus;
  },
}));

import { JobController } from '../../../modules/jobs/job.controller';

interface MockResponse {
  status: ReturnType<typeof vi.fn>;
  json: ReturnType<typeof vi.fn>;
}

const createResponse = (): MockResponse => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis(),
});

describe('Job controller testing', () => {
  let controller: InstanceType<typeof JobController>;
  beforeEach(() => {
    vi.clearAllMocks();
    controller = new JobController();
  });

  describe('job submit controller-tests', () => {
    it('must submit job success-test', async () => {
      mockedCreateJob.mockResolvedValue({
        id: '12',
        type: 'calculate-primes',
        payload: {},
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      const req = {
        body: {
          type: 'calculate-primes',
          payload: {},
        },
      } as Request;

      const res = createResponse();
      await controller.submitJob(req, res as unknown as Response, vi.fn());
      expect(mockedCreateJob).toHaveBeenCalledWith('calculate-primes', {});

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    it('400 return when job type miss- test', async () => {
      const req = { body: {} } as Request;
      const res = createResponse();
      await controller.submitJob(req, res as unknown as Response, vi.fn());
      expect(mockedCreateJob).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('job status fetch controller- test', () => {
    it('success job deatil return- test', async () => {
      const job: Job = {
        id: '12',
        type: 'bcrypt-hash',
        payload: {},
        status: 'completed',
        createdAt: new Date().toISOString(),
      };
      mockedGetJobStatus.mockResolvedValue(job);
      const req = {
        params: {
          id: '12',
        },
      } as unknown as Request;

      const res = createResponse();
      await controller.getJobStatus(req, res as unknown as Response, vi.fn());
      expect(mockedGetJobStatus).toHaveBeenCalledWith('12');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });

    it('404 return when job not exist- test', async () => {
      mockedGetJobStatus.mockResolvedValue(null);
      const req = {
        params: {
          id: 'unknown',
        },
      } as unknown as Request;
      const res = createResponse();
      await controller.getJobStatus(req, res as unknown as Response, vi.fn());

      expect(mockedGetJobStatus).toHaveBeenCalledWith('unknown');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
