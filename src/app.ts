import cors from 'cors';
import express, { Application } from 'express';
import { rateLimit } from 'express-rate-limit';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { errorHandler } from './middlewares/errorHandler';
import { fails } from './helpers/response.helper';
import { corsConfig, limitterConfig } from './config/app';
import { xssMiddleware } from './middlewares/xss';
import mainRoute from './routes/main.route';
import walletRoute from './routes/wallet.route';

/**
 * @description Init express application
 * @returns {Application} - Express application
 */
const init = function (): Application {
  const app: Application = express();

  app.use(cors(corsConfig()));
  app.use(rateLimit(limitterConfig()));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(xssMiddleware());

  app.use('/api', mainRoute);
  app.use('/api/wallet', walletRoute);

  app.use((_, res) => fails(
    res, 
    {
      status: StatusCodes.NOT_FOUND, 
      errors: [
        {
          code: getReasonPhrase(StatusCodes.NOT_FOUND),
          field: 'path',
          message: 'Path Not Found. Please go to /api'
        }
      ]
    }
  ));

  app.use(errorHandler);

  return app;
};

export default init;