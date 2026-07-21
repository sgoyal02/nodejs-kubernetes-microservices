import { Request, Response, RequestHandler } from 'express';
import { register } from '../metrics/registry';

export class MetricsController {
  getMetrics: RequestHandler = async (_req: Request, res: Response) => {
    res.set('Content-Type', register.contentType);
    res.send(await register.metrics());
  };
}
