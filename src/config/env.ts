import dotenv from 'dotenv';
dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` });

export const PORT = Number(process.env.PORT) || 3000;
export const NODE_ENV = String(process.env.NODE_ENV);
