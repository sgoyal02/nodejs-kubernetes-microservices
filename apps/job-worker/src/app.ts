import express, { Express, Request, Response } from 'express';
import { globalRouter } from './router';

export const app: Express = express();

app.use(express.json());
app.use('/api', globalRouter);
app.get('/healthz', (_req: Request, res: Response) => res.json({ status: 'ok' }));
