import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helper/jwtHelper';
import config from '../../config';
import jwt, { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get token authorization
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authorized');
      }
      // verifie token
      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.secret as Secret
      ) as jwt.JwtPayload;
      req.user = verifiedUser;
      // Role base authorization Guard
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'you are not access this route'
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
export default auth;
