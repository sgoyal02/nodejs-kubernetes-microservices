import bcrypt from 'bcrypt';

export const calPrimes = (maxNum: number): number[] => {
  const primes: number[] = [];
  for (let i = 2; i <= maxNum; i++) {
    let isPrime = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }
  return primes;
};

export const hashBcrypt = async (pswd: string): Promise<string> => {
  return await bcrypt.hash(pswd, 10);
};

export const createSortArr = (size: number): number[] => {
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000000));
  return arr.sort((a, b) => a - b);
};
