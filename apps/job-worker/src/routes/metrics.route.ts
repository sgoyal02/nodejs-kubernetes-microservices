import { Router } from 'express';
import { MetricsController } from '../controllers/metrics.controller';

const router: Router = Router();
const metricsController = new MetricsController();
router.get('/metrics', metricsController.getMetrics);

export { router as metricsRouter };
