import jwt, { JwtPayload } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/env';

/**
 * @description Generate token
 * @param {object} payload - Payload to be encoded
 * @param {string} tokenSecret - Token secret key
 * @param {string | number} expired - Expired time
 * @returns {string} - Token
 */
export function generateToken(payload: object | string = {}, tokenSecret: string, expired: string | number): string {
  return jwt.sign(payload, tokenSecret as string, { expiresIn: expired });
}

/**
 * @description Verify the token with token secret key to get a decoded token
 * @param {string} token - Token
 * @param {string} tokenSecret - Token secret key
 * @returns {Promise<object | string | undefined>}
 */
export function verifyToken(token: string, tokenSecret: string): Promise<object | string | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
}

/**
 * @description Decode the token to get a payload
 * @param {string} token - Token
 * @returns {JwtPayload | string | null}
 */
export function decodeToken(token: string): JwtPayload | string | null {
  return jwt.decode(token);
}

/**
 * @description Generate access token
 * @param {object | string} payload
 * @param {string} expired
 * @returns {string}
 */
export function generateAccessToken(payload: object | string = {}, expired: string = '10h'): string {
  return generateToken(payload, ACCESS_TOKEN_SECRET, expired);
}

/**
* @description Verify the access token with access token secret key to get a decoded token
* @param {string} token
* @returns {Promise<object | string | undefined>}
*/
export function verifyAccessToken(token: string): Promise<object | string | undefined> {
  return verifyToken(token, ACCESS_TOKEN_SECRET);
}

/**
* @description Get the user payload from access token
* @param {string} token
* @returns {JwtPayload | string | null}
*/
export function getUserPayloadFromAccessToken(token: string): JwtPayload | string | null {
  return decodeToken(token);
}