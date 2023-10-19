import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

export const PORT = Number(process.env.PORT) || 3000;
export const NODE_ENV = String(process.env.NODE_ENV);
export const REDIS_HOST = String(process.env.REDIS_HOST);
export const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
export const REDIS_PASSWORD = String(process.env.REDIS_PASSWORD);
