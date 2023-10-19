import type { Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { fails } from '../helpers/response.helper';

/**
 * @description Error handler
 * @param {Error} err - Error object
 * @param {Request} _req - Express request object
 * @param {Response} res - Express response object
 * @param {object | any} args - Object with status and payload
 * @returns {void} - Empty response
 */
export const errorHandler = (err: Error, _req: unknown | Request, res: Response): void => {
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
