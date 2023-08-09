import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import {
  IChangePassword,
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
} from './auth.interface';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helper/jwtHelper';

/*....... Login AccessToken 
  ............................. */
const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { id, password } = payload;
  //   const isUserExist= await User.findOne( { id }, {id:1, password:1 ,needsPasswordChange:1}).lean()
  // const user = new User();

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does't exist");
  }
  // isPasswordMatched instansMethod return boolen ,that why direct use condition
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect passoword');
  }

  //  Access token and Refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config?.jwt?.refresh_secret_expires as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

/*....... Refresh token 
  ............................. */
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    ) as jwt.JwtPayload;
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }

  // The type of verifiedToken is now JwtPayload, so accessing 'userId' should work fine.
  const { userId } = verifiedToken;

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist");
  }
  // genereate newToken
  const newAccesToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expires as string
  );

  return { accessToken: newAccesToken };
};

/* Change password  */

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  // const isUserExits = await User.isUserExist(user?.userId);

  // //  checking user exits
  // if (!isUserExits) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'user does not exits');
  // }

  // // checking old password
  // if (
  //   isUserExits.password &&
  //   !(await User.isPasswordMatched(oldPassword, isUserExits.password))
  // ) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password id incorrect');
  // }

  // // hash password before saving
  // const newHashedpass = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_salt_round)
  // );

  // // update password

  // const updatedData = {
  //   password: newHashedpass,
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(),
  // };
  // await User.findOneAndUpdate({ id: user?.userId }, updatedData);

  // Alternative ways

  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exits');
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password id incorrect');
  }
  isUserExist.needsPasswordChange = false;
  isUserExist.password = newPassword;

  // updating using save
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
