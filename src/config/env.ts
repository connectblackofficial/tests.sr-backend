import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

export const PORT = Number(process.env.PORT) || 3000;
export const NODE_ENV = String(process.env.NODE_ENV);
export const REDIS_HOST = String(process.env.REDIS_HOST);
export const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
export const REDIS_PASSWORD = String(process.env.REDIS_PASSWORD);
export const SYNC_ITEMS_PER_CYCLE = Number(process.env.SYNC_ITEMS_PER_CYCLE);

export const MYSQL_HOST = String(process.env.MYSQL_HOST);
export const MYSQL_PORT = Number(process.env.MYSQL_PORT);
export const MYSQL_DATABASE = String(process.env.MYSQL_DATABASE);
export const MYSQL_USER = String(process.env.MYSQL_USER);
export const MYSQL_PASSWORD = String(process.env.MYSQL_PASSWORD);

export const ACCESS_TOKEN_SECRET = String(process.env.ACCESS_TOKEN_SECRET);

export const USER_EMAIL = String(process.env.USER_EMAIL);
export const USER_PASSWORD = String(process.env.USER_PASSWORD);