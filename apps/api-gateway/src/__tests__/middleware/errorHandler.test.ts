import { describe, expect, it, vi } from 'vitest';
import type { Request, Response } from 'express';
import { errorHandler } from '../../middleware/errorHandler';

//mock res-
const createResponse = () => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn(),
});

describe('error handle middleware-testing', () => {
  it('error obj handle- test', () => {
    const res = createResponse();
    errorHandler(new Error('failed'), {} as Request, res as unknown as Response, vi.fn());
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('status code err handle- test', () => {
    const res = createResponse();
    const error = { message: 'bad req', statusCode: 400 };
    errorHandler(error, {} as Request, res as unknown as Response, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
