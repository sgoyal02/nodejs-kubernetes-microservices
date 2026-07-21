import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  console.error('global err:', err);
  const errMsg = err instanceof Error ? err.message : 'internal server error';
  const statusCode =
    typeof err === 'object' &&
    err !== null &&
    'statusCode' in err &&
    typeof err.statusCode === 'number'
      ? err.statusCode
      : 500;
  sendError(res, errMsg, statusCode);
};
