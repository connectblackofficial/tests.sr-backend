import { NODE_ENV } from '../config/env';
import { createLogger, format, transports } from 'winston';

/**
 * @description log of application
 * @param {string} env - current envitonment
 * @returns {winston.Logger} - Winston object
 */
export const log = (env: string) => {
  const outputLog = createLogger({
    level: env === 'production' ? 'info' : 'debug',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    silent: env === 'test',
    defaultMeta: { service: 'wallet-api' },
    transports: [
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/status.log' })
    ],
    exceptionHandlers: [
      new transports.File({ filename: 'logs/exceptions.log' }),
      new transports.Console({ format: format.simple() })
    ]
  });

  if (env !== 'production') {
    outputLog.add(
      new transports.Console({
        format: format.simple()
      })
    );
  }

  return outputLog;
};

/**
 * @description method for log
 * @param {string} env - current envitonment
 * @returns {winston.Logger} - Winston object
 */
const logger = log(NODE_ENV);

export default logger;
