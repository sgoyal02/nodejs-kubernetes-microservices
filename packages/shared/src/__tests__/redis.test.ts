import { describe, it, expect, vi, beforeEach } from 'vitest';
import { redis, connectRedis } from '../redis';

describe('redis connection testing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('test- not connect if already ready', async () => {
    const connectSpy = vi.spyOn(redis, 'connect');
    Object.defineProperty(redis, 'status', {
      value: 'ready',
      configurable: true,
    });
    await connectRedis();
    expect(connectSpy).not.toHaveBeenCalled();
  });

  it('test- not connect if already connecting', async () => {
    const connectSpy = vi.spyOn(redis, 'connect');
    Object.defineProperty(redis, 'status', {
      value: 'connecting',
      configurable: true,
    });
    await connectRedis();
    expect(connectSpy).not.toHaveBeenCalled();
  });

  it('test- connect when redis not connected', async () => {
    const connectSpy = vi.spyOn(redis, 'connect').mockResolvedValue();
    Object.defineProperty(redis, 'status', {
      value: 'wait',
      configurable: true,
    });
    await connectRedis();
    expect(connectSpy).toHaveBeenCalledTimes(1);
  });

  it('test- throw error on connection fail', async () => {
    vi.spyOn(redis, 'connect').mockRejectedValue(new Error('Redis connection failed'));
    Object.defineProperty(redis, 'status', {
      value: 'wait',
      configurable: true,
    });
    await expect(connectRedis()).rejects.toThrow('Redis connection failed');
  });
});
