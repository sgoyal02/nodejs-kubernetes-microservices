import { Router } from 'express';
import { JobController } from './job.controller';

const router = Router();
const controller = new JobController();
router.post('/submit', controller.submitJob);
router.get('/status/:id', controller.getJobStatus);

export { router as jobsRouter };
