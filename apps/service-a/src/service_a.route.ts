import { Router } from 'express';
import { submitJob } from './service_a.controller';

const router = Router();
router.post('/submit', submitJob);

export { router as serviceARouter };
