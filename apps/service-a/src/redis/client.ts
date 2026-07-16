import Redis from 'ioredis';
import { env } from '../config/env';

export const redisClient = new Redis(env.redisUrl);

redisClient.on('connect', () => {
  console.log('Connected redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connect error: ', err);
});
