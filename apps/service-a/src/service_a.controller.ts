import { Request, Response } from 'express';
import { createJob } from './service_a.service';

export async function submitJob(req: Request, res: Response) {
  try {
    const job = await createJob();
    res.status(201).json({ jobId: job.id, status: job.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fail in create job' });
  }
}
