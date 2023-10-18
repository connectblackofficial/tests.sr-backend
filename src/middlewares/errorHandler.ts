import type { Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { fails } from '../helpers/response.helper';

export const errorHandler = (err: Error, _req: any | Request, res: Response): void => {
  fails(res, {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    errors: [
      {
        code: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        field: 'server',
        message: err.message
      }
    ]
  });
};
