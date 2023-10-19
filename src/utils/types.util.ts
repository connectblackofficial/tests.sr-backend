import type { NextFunction, Request, Response } from 'express';
import type { DeepPartial } from 'utility-types';
import type { IFilterXSSOptions } from 'xss';

export type TypedRequest<
  ReqBody = Record<string, unknown>,
  QueryString = Record<string, unknown>
> = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  DeepPartial<ReqBody>,
  DeepPartial<QueryString>
>;

export type Sanitized<T> = T extends (...args: unknown[]) => unknown
  ? T
  : T extends object
  ? {
      readonly [K in keyof T]: Sanitized<T[K]>;
    }
  : T;

export type SanitizeOptions = IFilterXSSOptions & {
  whiteList?: IFilterXSSOptions['whiteList'];
};

export type ExpressMiddleware<
  ReqBody = Record<string, unknown>,
  Res = Record<string, unknown>,
  QueryString = Record<string, unknown>
> = (
  req: TypedRequest<ReqBody, QueryString>,
  res: Response<Res>,
  next: NextFunction
) => Promise<void> | void;

export interface DecodedUser {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface IRequest extends Request {
  user?: DecodedUser;
}