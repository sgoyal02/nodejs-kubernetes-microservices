import { popFromQueue } from '@nodejs-kubernetes-microservices/shared';
import { processJob } from '../services/jobProcessor';

export const startWorker = () => {
  console.log(`worker started- ${process.env.WORKER_NAME || 'default'}`);
  const processLoop = async () => {
    try {
      const jobId = await popFromQueue();
      console.log('jobId pop: ', jobId);
      if (jobId) {
        await processJob(jobId);
        console.log('jobId pop worker finish:');
      }
    } catch (err) {
      console.error('worker err-', err);
    }
    setTimeout(processLoop, 100); //loop rerun
  };

  processLoop();
};
