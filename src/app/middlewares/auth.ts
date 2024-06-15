import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { USER_ROLE } from '../modules/User/user.constant';
import catchAsync from '../modules/Utils/catchAsync';
import { User } from '../modules/User/user.model';
import httpStatus from 'http-status';


const sliptToken = (authHeader: string | undefined): string | null => {
  if (!authHeader) {
      return null;
  }
  const [bearer, token] = authHeader.split(' ');

  if (bearer === 'Bearer' && token) {
      return token;
  }

  return authHeader;
};


export const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      // const accessToken = req.headers.authorization;

      const authHeader = req.headers.authorization;
      const accessToken = sliptToken(authHeader);
  
      if (!accessToken) {
        throw new AppError(401, "You are not authorized to access this route");
      }
  
      const verfiedToken = jwt.verify(
        accessToken as string,
        config.jwt_access_secret as string
      );
  
      const { role, email, iat } = verfiedToken as JwtPayload;
  
      const user = await User.findOne({ email });
  
      // console.log(verfiedToken)
      // console.log(user)
  
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This is user is not found")
      }
  
      if (!requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized")
      }

      req.user = verfiedToken as JwtPayload

      next();
    });
  };