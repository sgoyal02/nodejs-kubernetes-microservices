import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@nodejs-kubernetes-microservices/shared/src', () => ({
  getJob: vi.fn(),
  updateJob: vi.fn(),
  redis: {
    incr: vi.fn(),
  },
}));

import { processJob } from '../../services/jobProcessor';
import { getJob, updateJob } from '@nodejs-kubernetes-microservices/shared/src';

describe('Job processor--testing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('prime cal job process- test', async () => {
    getJob.mockResolvedValue({
      id: '1',
      type: 'calculate-primes',
    });

    await processJob('1');
    expect(updateJob).toHaveBeenCalled();
  });

  it('should mark failed job', async () => {
    getJob.mockResolvedValue({
      id: '1',
      type: 'unknown',
    });

    await processJob('1');
    expect(updateJob).toHaveBeenCalledWith('1', expect.objectContaining({ status: 'failed' }));
  });

  it('should ignore missing job', async () => {
    getJob.mockResolvedValue(null);
    await processJob('10');
    expect(updateJob).not.toHaveBeenCalled();
  });
});
