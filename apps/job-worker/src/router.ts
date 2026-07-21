import { Router } from 'express';
import { metricsRouter } from './routes/metrics.route';

const router: Router = Router();
router.use('/worker', metricsRouter);

export { router as globalRouter };
