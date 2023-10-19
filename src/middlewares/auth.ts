import { NextFunction, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { IRequest } from '../utils/types.util';
import { getUserPayloadFromAccessToken, verifyAccessToken } from '../helpers/jwt.helper';
import { fails } from '../helpers/response.helper';
import logger from '../helpers/logger.helper';

/**
 * Middleware to check if user is authenticated
 * @param {IRequest} req - Request express object
 * @param {Response} res - Response express object
 * @param {NextFunction} next - Next express function
 * @returns {Promise<void | Response>} - Promise object of void or Response
 */
export default async function auth(req: IRequest, res: Response, next: NextFunction): Promise<void | Response> {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return fails(res, {
        status: StatusCodes.UNAUTHORIZED,
        errors: [
          {
            code: getReasonPhrase(StatusCodes.UNAUTHORIZED),
            field: 'auth',
            message: 'Token invalid'
          }
        ]
      });
    }

    try {
      await verifyAccessToken(token);
      const decoded = getUserPayloadFromAccessToken(token) as any;
      req.user = decoded;

      next();
      return;
    } catch (err) {
      const error = err as unknown as Error;
      logger.error(`Error in verify token: ${auth.name} - ${error.message}`);
      return fails(res, {
        status: StatusCodes.UNAUTHORIZED,
        errors: [
          {
            code: getReasonPhrase(StatusCodes.UNAUTHORIZED),
            field: 'auth',
            message: 'Token invalid'
          }
        ]
      });
    }
  } catch (err) {
    const error = err as unknown as Error;
    logger.error(`Error in verify token: ${auth.name} - ${error.message}`);
    return fails(res, {
      status: StatusCodes.UNAUTHORIZED,
      errors: [
        {
          code: getReasonPhrase(StatusCodes.UNAUTHORIZED),
          field: 'auth',
          message: 'Unauthorized'
        }
      ]
    });
  }
}