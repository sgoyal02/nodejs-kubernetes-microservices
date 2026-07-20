import { Request, Response, NextFunction, RequestHandler } from 'express';

export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
