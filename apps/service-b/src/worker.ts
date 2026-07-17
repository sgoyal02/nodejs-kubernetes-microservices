import { popFromQueue } from '@nodejs-kubernetes-microservices/shared/src';

export const startWorker = () => {
  console.log(`worker started- ${process.env.WORKER_NAME || 'default'}`);
  const processLoop = async () => {
    try {
      const jobId = await popFromQueue();

      if (jobId) {
        //process job- to do
      }
    } catch (err) {
      console.error('worker err-', err);
    }
    setTimeout(processLoop, 100); //loop rerun
  };

  processLoop();
};
