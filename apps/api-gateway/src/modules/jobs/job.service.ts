import { v4 } from 'uuid';
import { getJob, submitJob, Job, JobType } from '@nodejs-kubernetes-microservices/shared/src';

export class JobService {
  async createJob(type: JobType, payload?: Record<string, unknown>): Promise<Job> {
    const newJob: Job = {
      id: v4(),
      type: type,
      payload: payload || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    await submitJob(newJob);
    return newJob;
  }

  async getJobStatus(jobId: string) {
    const job = await getJob(jobId);
    if (!job) {
      return null;
    }
    return job;
  }
}
