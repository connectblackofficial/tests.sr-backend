import { Application } from 'express';
import init from './app';
import { PORT } from './config/env';
import logger from './helpers/logger.helper';

/**
 * Bootstrap the application
 */
const app: Application = init();
const server = app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing http server.');
  server.close((err) => {
    logger.info('Http server closed.');
    process.exit(err ? 1 : 0);
  });
});