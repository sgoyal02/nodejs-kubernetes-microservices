import { Request, RequestHandler, Response } from 'express';
import { StatsService } from './stats.service';
import { sendSuccess } from '../../utils/response';
import { asyncHandler } from '../../middleware/asyncHandler';

const statsService = new StatsService();
export class StatsController {
  getStats: RequestHandler = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await statsService.getStatsSummary();
    sendSuccess(res, stats, 'Stats fetch success');
  });
}
