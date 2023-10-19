import { ValidationError, Schema } from 'yup';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { fails } from '../helpers/response.helper';
import { NextFunction, Request, Response } from 'express';

/**
 * @description Validate that a resource being POSTed or PUT has a valid shape, else return 400 Bad Request
 * @param {*} schema is a yup schema
 */
export const validateMiddleware =
  (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
    let resource;

    if (req.body) {
      resource = { body: req.body };
    }

    if (req.query) {
      resource = { ...resource, query: req.query };
    }

    if (req.params) {
      resource = { ...resource, params: req.params };
    }

    try {
      await schema.validate(resource);
      return next();
    } catch (err) {
      const error = err as ValidationError;
      return fails(res, {
        status: StatusCodes.BAD_REQUEST,
        errors: [
          {
            code: getReasonPhrase(StatusCodes.BAD_REQUEST),
            field: error.name,
            message: error.message
          }
        ]
      });
    }
  };
