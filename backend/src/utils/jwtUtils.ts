import * as jwt from 'jsonwebtoken';

export default class JwtUtils {
  private jwtSecret = process.env.JWT_SECRET || 'securit';

  sign(payload : { id: number }) : string {
    const options : jwt.SignOptions = {
      expiresIn: '3d',
    };

    return jwt.sign(payload, this.jwtSecret, options);
  }

  dedoded(token : string) {
    const decoded = jwt.verify(token, this.jwtSecret);
    return decoded as jwt.JwtPayload;
  }
}