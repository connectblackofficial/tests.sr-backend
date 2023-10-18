import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorHandler } from '../../src/middlewares/errorHandler';

describe('errorHandler', () => {
  it('should respond with a 500 Internal Server Error for an error', () => {
    const error = new Error('Test error message');
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockRequest = {} as unknown as Request;

    errorHandler(error, mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      errors: [
        {
          code: 'Internal Server Error',
          field: 'server',
          message: 'Test error message',
        },
      ],
    });
  });
});
