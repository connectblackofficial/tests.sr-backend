import { Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import logger from './logger.helper';

export interface ResponseErrorEntity {
  code: string;
  field?: string;
  message?: string;
}

export interface HandlePayloadParams {
  status: StatusCodes;
  payload?: Record<string, unknown>;
  field?: string;
}

export interface HandleResMessageErrorParams extends HandlePayloadParams {
  errors: Array<ResponseErrorEntity | Error>;
}

/**
 * @description Make fails response
 * @param {Response} res - Express response object
 * @param {object | any} args - Object with status, error and payload
 * @returns {Response} - Express response object
 */
export const fails = (res: Response, args: HandleResMessageErrorParams) => {
  const { status, errors, payload } = args;
  logger.info(`fail log`)
  logger.error(JSON.stringify(args))
  return res.status(status).json({
    success: false,
    errors,
    ...(payload ? { payload } : {})
  });
};

/**
 * @description Make unauthorized response
 * @param {Response} res - Express response object
 * @returns {Response} - Express response object
 */
export const unauthorized = (res: Response) => {
  logger.info(`unauthorized access`)
  return res.status(StatusCodes.UNAUTHORIZED).json({
    success: false,
    errors: [{ code: getReasonPhrase(StatusCodes.UNAUTHORIZED) }]
  });
};

/**
 * @description Make forbidden response
 * @param {Response} res - Express response object
 * @returns {Response} - Express response object
 */
export const forbidden = (res: Response) => {
  logger.info(`forbidden access`)
  return res.status(StatusCodes.FORBIDDEN).json({
    success: false,
    errors: [{ code: getReasonPhrase(StatusCodes.FORBIDDEN) }]
  });
};

/**
 * @description Make success response
 * @param {Response} res - Express response object
 * @param {object | any} args - Object with status and payload
 * @returns {Response} - Express response object
 */
export const succeed = (res: Response, args: HandlePayloadParams) => {
  logger.info(`succeed response`)
  logger.info(JSON.stringify(args))
  
  return res.status(args.status).json({
    success: true,
    ...(args.payload ? { payload: args.payload } : {})
  });
};

/**
 * @description Make OK response
 * @param {Response} res - Express response object
 * @returns {Response} - Express response object
 */
export const ok = (res: Response) => {
  logger.info(`ok response`)
  return succeed(res, { status: StatusCodes.OK });
};
