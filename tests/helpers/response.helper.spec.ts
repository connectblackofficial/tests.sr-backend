import { Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import {
  HandlePayloadParams,
  HandleResMessageErrorParams,
  fails,
  unauthorized,
  forbidden,
  succeed,
  ok,
} from '../../src/helpers/response.helper';

describe('Response Helper', () => {
  let mockResponse: Response;

  beforeEach(() => {
    mockResponse = {} as Response;
    mockResponse.status = jest.fn().mockReturnValue(mockResponse);
    mockResponse.json = jest.fn().mockReturnValue(mockResponse);
  });

  it('fails() should return a failure response', () => {
    const args: HandleResMessageErrorParams = {
      status: StatusCodes.BAD_REQUEST,
      errors: [{ code: 'ValidationError', field: 'fieldName', message: 'Invalid field' }],
      payload: { additionalInfo: 'Some data' },
    };

    const response = fails(mockResponse, args);

    expect(response.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      errors: args.errors,
      payload: args.payload,
    });
  });

  it('fails() should return a failure response without payload', () => {
    const args: HandleResMessageErrorParams = {
      status: StatusCodes.BAD_REQUEST,
      errors: [{ code: 'ValidationError', field: 'fieldName', message: 'Invalid field' }],
    };

    const response = fails(mockResponse, args);

    expect(response.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      errors: args.errors
    });
  });

  it('unauthorized() should return an unauthorized response', () => {
    const response = unauthorized(mockResponse);

    expect(response.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      errors: [{ code: getReasonPhrase(StatusCodes.UNAUTHORIZED) }],
    });
  });

  it('forbidden() should return a forbidden response', () => {
    const response = forbidden(mockResponse);

    expect(response.status).toHaveBeenCalledWith(StatusCodes.FORBIDDEN);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      errors: [{ code: getReasonPhrase(StatusCodes.FORBIDDEN) }],
    });
  });

  it('succeed() should return a success response', () => {
    const args: HandlePayloadParams = {
      status: StatusCodes.CREATED,
      payload: { id: 123 },
    };

    const response = succeed(mockResponse, args);

    expect(response.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(response.json).toHaveBeenCalledWith({
      success: true,
      payload: args.payload,
    });
  });

  it('ok() should return an OK response', () => {
    const response = ok(mockResponse);

    expect(response.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(response.json).toHaveBeenCalledWith({
      success: true,
    });
  });
});