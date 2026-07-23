import { popFromQueue } from '@nodejs-kubernetes-microservices/shared';
import { processJob } from '../services/jobProcessor';

export const startWorker = () => {
  const processLoop = async () => {
    try {
      const jobId = await popFromQueue();
      if (jobId) {
        await processJob(jobId);
      }
    } catch (err) {
      console.error('worker err-', err);
    }
    setTimeout(processLoop, 100); //loop rerun
  };

  processLoop();
};
