import { Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { USER_EMAIL, USER_PASSWORD } from '../../src/config/env';
import loginController from '../../src/controllers/auth.controller';

describe('Auth Controller', () => {
  let mockRequest: Request;
  let mockResponse: Response;

  beforeEach(() => {
    mockRequest = {} as Request;
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  it('should successfully log in with correct credentials', async () => {
    mockRequest.body = {
      email: USER_EMAIL,
      password: USER_PASSWORD,
    };

    await loginController.login(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      payload: {
        accessToken: expect.any(String), // Assuming generateAccessToken works
        message: 'Login success',
      },
    });
  });

  it('should return an error when logging in with incorrect credentials', async () => {
    mockRequest.body = {
      email: 'incorrect_email',
      password: 'incorrect_password',
    };

    await loginController.login(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      errors: [
        {
          code: getReasonPhrase(StatusCodes.BAD_REQUEST),
          field: 'auth',
          message: 'Login invalid',
        },
      ],
    });
  });
});
