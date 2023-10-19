import { Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { generateAccessToken } from '../helpers/jwt.helper';
import { fails, succeed } from '../helpers/response.helper';
import { USER_EMAIL, USER_PASSWORD } from '../config/env';
import logger from '../helpers/logger.helper';

/**
 * @description Login user
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Promise object of Express Response
 */
async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password } = req.body;

    const isLogin = email === USER_EMAIL && password === USER_PASSWORD;

    if (!isLogin) {
        return fails(res, {
          status: StatusCodes.BAD_REQUEST,
          errors: [
            {
              code: getReasonPhrase(StatusCodes.BAD_REQUEST),
              field: 'auth',
              message: 'Login invalid'
            }
          ]
        });
    }

    const JWTPayload = { id: 1, email: USER_EMAIL, role: 'manager' };
    const accessToken = generateAccessToken(JWTPayload, '5h');

    const message = 'Login success';
    return succeed(res, {
      status: StatusCodes.OK,
      payload: {
        accessToken,
        message
      }
    })
  } catch (err) {
    const error = err as unknown as Error;
    logger.error(`Error in auth: ${login.name} - ${error.message}`);

    return fails(res, {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      errors: [
        {
          code: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
          field: 'auth',
          message: 'Login invalid'
        }
      ]
    });
  }
}

export default { login };