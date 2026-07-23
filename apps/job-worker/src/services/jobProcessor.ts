import { getJob } from '@nodejs-kubernetes-microservices/shared';
import { calPrimes, createSortArr, hashBcrypt } from '../utils/cpuJobs';
import { updateJob } from '@nodejs-kubernetes-microservices/shared';
import { jobErrorsTotal, jobProcessingTimeSeconds, jobsProcessedTotal } from '../metrics/registry';
import { redis } from '@nodejs-kubernetes-microservices/shared';

export const processJob = async (jobId: string) => {
  const startTime = Date.now();
  const job = await getJob(jobId);
  if (!job) return;
  try {
    await updateJob(jobId, { status: 'processing' });
    console.log('woker process job: ', job);
    let result: unknown;
    switch (job.type) {
      case 'calculate-primes':
        result = calPrimes(100000);
        break;
      case 'bcrypt-hash':
        result = await hashBcrypt('pswd1234');
        break;
      case 'sort-array':
        result = createSortArr(100000);
        break;
      default:
        throw new Error(`job type unknown:${job.type}`);
    }

    const processTimeMs = Date.now() - startTime;
    console.log('process worker job modify complete time: ', processTimeMs, result);
    await updateJob(jobId, {
      status: 'completed',
      result,
      processTime: processTimeMs,
    });
    jobsProcessedTotal.inc({ job_type: job.type });
    jobProcessingTimeSeconds.observe({ job_type: job.type }, processTimeMs / 1000);
    await redis.incr('stats:jobs:completed');
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'job process failed.';
    await updateJob(jobId, {
      status: 'failed',
      error: errMsg,
    });
    jobErrorsTotal.inc({ job_type: job.type });
    console.error(`job process failed for ${jobId}: `, errMsg);
  }
};
