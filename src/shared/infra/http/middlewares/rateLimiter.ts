import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const rateLimiterRedis = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimit',
  points: 3, // Number of points
  duration: 1, // Per second
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await rateLimiterRedis.consume(request.ip);

    return next();
  } catch {
    throw new AppError('Too Many Requests', 429);
  }
}
