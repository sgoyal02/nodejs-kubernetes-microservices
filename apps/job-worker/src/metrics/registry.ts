import client from 'prom-client';

export const register = new client.Registry();
client.collectDefaultMetrics({ register });

export const jobsProcessedTotal = new client.Counter({
  name: 'jobs_processed_total',
  help: 'Total jobs processed in success',
  labelNames: ['job_type'],
  registers: [register],
});

export const jobErrorsTotal = new client.Counter({
  name: 'job_errors_total',
  help: 'Total jobs processed in failed',
  labelNames: ['job_type'],
  registers: [register],
});

export const jobProcessingTimeSeconds = new client.Histogram({
  name: 'job_processing_time_seconds',
  help: 'Time for job to process in sec',
  labelNames: ['job_type'],
  buckets: [0.1, 0.5, 1, 2, 5, 10, 30],
  registers: [register],
});
