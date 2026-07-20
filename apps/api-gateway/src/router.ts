import { Router } from 'express';
import { jobsRouter } from './modules/jobs/job.route';

const router = Router();
router.use('/jobs', jobsRouter);

export { router as globalRouter };
