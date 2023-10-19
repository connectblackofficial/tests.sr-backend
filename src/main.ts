import { Application } from 'express';
import { CronJob } from 'cron';
import { PORT, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, SYNC_ITEMS_PER_CYCLE } from './config/env';
import { connDatasource } from './config/database';
import logger from './helpers/logger.helper';
import init from './app';
import StoreBalance from './services/store.service';

/**
 * Bootstrap the application
 */
const app: Application = init();
const server = app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

/**
 * Database
 */
connDatasource
  .initialize()
  .then(() => {
    logger.info('Database has been initialized!');
  })
  .catch((err) => {
    logger.info(`Error during Database initialization: ${err}`);
  });

/**
 * Cronjob
 */
new CronJob(
	'0 */1 * * * *',
	async () => {
    logger.info('CRONJOB running...');
    const store = new StoreBalance({
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD
    });

    await store.connect();
    await store.syncPreviewBalanceToDatabase(SYNC_ITEMS_PER_CYCLE);
	},
	null,
	true
);

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing http server.');
  server.close((err) => {
    logger.info('Http server closed.');
    process.exit(err ? 1 : 0);
  });
});