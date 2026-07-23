import { QUEUE_NAME, redis } from '@nodejs-kubernetes-microservices/shared';
import { queueLength, totalJobsCompleted, totalJobsSubmitted } from '../metrics/registry';
import { StatsSummary } from '../../../../../packages/shared';

export class StatsService {
  async getStatsSummary(): Promise<StatsSummary> {
    const [submitCount, completeCount, size] = await Promise.all([
      redis.get('stats:jobs:submitted'),
      redis.get('stats:jobs:completed'),
      redis.llen(QUEUE_NAME),
    ]);

    const totalSubmit = Number(submitCount) || 0;
    const totalComplete = Number(completeCount) || 0;
    totalJobsSubmitted.set(totalSubmit);
    totalJobsCompleted.set(totalComplete);
    queueLength.set(size);

    return { totalSubmit, totalComplete, currQueueLength: size };
  }
}
