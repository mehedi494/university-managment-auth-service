import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

import { AuthService } from './auth.service';
import { ILoginResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.cookies,"cookie");
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...otherdata } = result;
  // set refresh token in cookie
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOption);
  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'login successful !',
    data: otherdata,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.cookies,"cookie");
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token in cookie
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOption);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'login successful !',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  await AuthService.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password changed successful !',
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
