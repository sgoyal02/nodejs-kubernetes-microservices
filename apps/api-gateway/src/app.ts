import express from 'express';
import { globalRouter } from './router';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

app.use(express.json());
app.use('/api', globalRouter);
app.use(errorHandler);
