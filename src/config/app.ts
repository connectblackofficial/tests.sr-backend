import { CorsOptions } from 'cors';
import { Options } from 'express-rate-limit';

export const corsConfig = (): CorsOptions => ({
  origin: '*',
  credentials: true
});

export const limitterConfig = (): Partial<Options> => ({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: true,
  statusCode: 429,
  message: 'Too many requests, please try again later.'
});
