import { Request, Response } from 'express';
import { succeed } from '../helpers/response.helper';
import { StatusCodes } from 'http-status-codes';

/**
 * @description Main index controller
 * @param {IRequest} _ - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Promise object of Express Response
 */
function index(_: Request, res: Response): Response {
  return succeed(res, {
    status: StatusCodes.OK,
    payload: {
      message: 'Welcome! API is running...'
    }
  });
}

export default { index };
