import { Request, Response, NextFunction } from 'express';
import JwtUtils from '../utils/jwtUtils';

const Authorized = (req : Request, res : Response, next : NextFunction)
: Response | void => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const data = authorization.split(' ');

  try {
    const decoded = new JwtUtils();
    const autorized = decoded.dedoded(data[1]);

    res.locals = autorized;
    res.locals.userId = autorized.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default Authorized;