import express from 'express';
import { serviceARouter } from './service_a.route';

export const app = express();

app.use(express.json());
app.use(serviceARouter);
