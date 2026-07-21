import client from 'prom-client';

export const register = new client.Registry();
client.collectDefaultMetrics({ register });

export const totalJobsSubmitted = new client.Gauge({
  name: 'total_jobs_submitted',
  help: 'Total jobs submitted to the queue',
  registers: [register],
});

export const totalJobsCompleted = new client.Gauge({
  name: 'total_jobs_completed',
  help: 'Total jobs completed by workers',
  registers: [register],
});

export const queueLength = new client.Gauge({
  name: 'queue_length',
  help: 'Curr pending jobs count in redis queue',
  registers: [register],
});
