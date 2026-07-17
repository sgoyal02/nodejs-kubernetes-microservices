import { Request, RequestHandler, Response } from 'express';
import { JobService } from './job.service';
import { sendError, sendSuccess } from '../../utils/response';
import { asyncHandler } from '../../middleware/asyncHandler';

const jobService = new JobService();
export class JobController {
  submitJob: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const { type, payload } = req.body;
    if (!type) {
      return sendError(res, 'Job type is required', 400);
    }
    const job = await jobService.createJob(type, payload);
    sendSuccess(res, { jobId: job.id, status: job.status }, 'Job submitted successfully', 201);
  });

  getJobStatus: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      return sendError(res, 'Job-id is required', 400);
    }
    const job = await jobService.getJobStatus(id);
    if (!job) {
      return sendError(res, 'Job not found', 404);
    }
    sendSuccess(res, job, 'Job status received success');
  });
}
