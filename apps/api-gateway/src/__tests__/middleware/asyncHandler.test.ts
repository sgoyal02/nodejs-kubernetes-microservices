import { describe, expect, it, vi } from 'vitest';
import { asyncHandler } from '../../middleware/asyncHandler';

describe('asyncHandler middleware-testing', () => {
  it('promis reject next call- test', async () => {
    const next = vi.fn();
    const handler = asyncHandler(async () => {
      throw new Error('failed');
    });

    await handler({} as never, {} as never, next);
    await Promise.resolve();
    expect(next).toHaveBeenCalled();
  });
});
