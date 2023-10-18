import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { succeed } from '../helpers/response.helper';
import { WalletRequestBody } from '../models/wallet';
import { TypedRequest } from '../utils/types.util';

/**
 * @description Add balance controller
 * @param {WalletRequestBody} req - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Promise object of Express Response
 */
function add(req: TypedRequest<WalletRequestBody>, res: Response): Response {
  return succeed(res, {
    status: StatusCodes.OK,
    payload: {
      message: 'Welcome! API is running...'
    }
  });
}

/**
 * @description Subtract balance controller
 * @param {WalletRequestBody} req - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Promise object of Express Response
 */
function subtract(req: Request, res: Response): Response {
  return succeed(res, {
    status: StatusCodes.OK,
    payload: {
      message: 'Welcome! API is running...'
    }
  });
}

export default { add, subtract };
