import { describe, it, expect } from 'vitest';

import { calPrimes, createSortArr, hashBcrypt } from '../../utils/cpuJobs';

describe('CPU Jobs', () => {
  it('should calculate prime numbers', () => {
    const result = calPrimes(10);

    expect(result).toEqual([2, 3, 5, 7]);
  });

  it('should create sorted array', () => {
    const result = createSortArr(100);

    expect(result.length).toBe(100);

    for (let i = 1; i < result.length; i++) {
      expect(result[i]).toBeGreaterThanOrEqual(result[i - 1]);
    }
  });

  it('should generate bcrypt hash', async () => {
    const hash = await hashBcrypt('password');

    expect(hash).not.toBe('password');

    expect(hash.length).toBeGreaterThan(20);
  });
});
