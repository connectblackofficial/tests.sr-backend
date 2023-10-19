import { Request, Response } from 'express';
import { validateMiddleware } from '../../src/middlewares/validate';
import { object, string } from 'yup';

describe('validateMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {} as Partial<Request>;
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    } as Partial<Response>;
    mockNext = jest.fn();
  });

  it('should call next() when validation passes with only param body', async () => {
    const schema = object({
      body: object({
        name: string().required(),
      }),
    });

    mockRequest.body = { name: 'John' };
    await validateMiddleware(schema)(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('should call next() when validation passes with all params', async () => {
    const schema = object({
      body: object({
        name: string().required(),
      }),
      query: object({
        page: string().required(),
      }),
      params: object({
        id: string().required(),
      }),
    });

    mockRequest = {
      ...mockRequest,
      body: {
        name: 'John'
      },
      query: {
        page: '1'
      },
      params: {
        id: '123'
      }
    };
    await validateMiddleware(schema)(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('should send a 400 Bad Request response when validation fails', async () => {
    const schema = object({
      body: object({
        name: string().required(),
      }),
    });

    mockRequest.body = { invalidField: 'John' };
    await validateMiddleware(schema)(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      errors: [
        {
          code: 'Bad Request',
          field: 'ValidationError',
          message: 'body.name is a required field',
        },
      ],
    });
  });
});