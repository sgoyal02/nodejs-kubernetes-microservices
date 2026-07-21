import express, { Request, Response, Express } from 'express';
import { globalRouter } from './router';
import { errorHandler } from './middleware/errorHandler';

export const app: Express = express();

app.use(express.json());
app.use('/api', globalRouter);
app.get('/healthz', (_req: Request, res: Response) => res.json({ status: 'ok' }));

app.use(errorHandler);
