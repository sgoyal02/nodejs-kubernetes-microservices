import { Router } from 'express';
import { StatsController } from './stats.controller';

const router: Router = Router();
const statsController = new StatsController();
router.get('/stats', statsController.getStats);

export { router as statsRouter };
