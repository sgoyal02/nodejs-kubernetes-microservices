import { ApiResponse } from '@nodejs-kubernetes-microservices/shared/src';
import { Response } from 'express';

export const sendSuccess = <T>(res: Response, data: T, msg = 'Success', statusCode = 200): void => {
  const responseBody: ApiResponse<T> = {
    success: true,
    statusCode,
    msg,
    data,
    err: null,
  };
  res.status(statusCode).json(responseBody);
};

export const sendError = (res: Response, errMsg: string, statusCode = 400): void => {
  const responseBody: ApiResponse = {
    success: false,
    statusCode,
    msg: errMsg,
    data: null,
    err: errMsg,
  };
  res.status(statusCode).json(responseBody);
};
