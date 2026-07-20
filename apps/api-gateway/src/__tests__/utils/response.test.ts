import { describe, expect, it, vi } from 'vitest';
import type { Response } from 'express';
import { sendError, sendSuccess } from '../../utils/response';

//mocks init-
const createResponse = () => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis(),
});

describe('response util testing', () => {
  it('success res- test', () => {
    const res = createResponse();
    sendSuccess(res as unknown as Response, { id: '123' }, 'created', 201);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        statusCode: 201,
      })
    );
  });

  it('error msg res- test', () => {
    const res = createResponse();
    sendError(res as unknown as Response, 'failed', 400);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        err: 'failed',
      })
    );
  });
});
