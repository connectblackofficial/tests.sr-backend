import cors from 'cors';
import express, { Application } from 'express';
import { rateLimit } from 'express-rate-limit';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { fails } from './helpers/response.helper';
import { corsConfig, limitterConfig } from './config/app';
import mainRoute from './routes/main.route';

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

  app.use('/api', mainRoute);

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

  return app;
};

export default init;