import { getJob, updateJob } from '@nodejs-kubernetes-microservices/shared';
import { calPrimes, createSortArr, hashBcrypt } from '../utils/cpuJobs';

export const processJob = async (jobId: string) => {
  const startTime = Date.now();
  const job = await getJob(jobId);
  if (!job) return;
  try {
    await updateJob(jobId, { status: 'processing' });
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
    await updateJob(jobId, {
      status: 'completed',
      result,
      processTime: processTimeMs,
    });
    console.log(`job complete tym-${processTimeMs} ms`);
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'job process failed.';
    await updateJob(jobId, {
      status: 'failed',
      error: errMsg,
    });
    console.error(`job process failed for ${jobId}: `, errMsg);
  }
};
