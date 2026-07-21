import { Request, Response, RequestHandler } from 'express';
import { StatsService } from '../stats/stats.service';
import { register } from './registry';
import { asyncHandler } from '../../middleware/asyncHandler';

const statsService = new StatsService();
export class MetricsController {
  getMetrics: RequestHandler = asyncHandler(async (_req: Request, res: Response) => {
    await statsService.getStatsSummary();
    res.set('Content-Type', register.contentType);
    res.send(await register.metrics());
  });
}
