import { Router } from 'express';
import { statsRouter } from './modules/stats/stats.route';
import { metricsRouter } from './modules/metrics/metrics.route';

const router: Router = Router();
router.use(statsRouter);
router.use(metricsRouter);
export { router as globalRouter };
