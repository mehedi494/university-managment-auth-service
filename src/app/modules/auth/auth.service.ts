import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../users/user.model';
import { ILoginResponse, ILoginUser } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helper/jwtHelper';

const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  // eslint-disable-next-line no-console
  console.log(payload);
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
    { id: userId, role },
    config.jwt.secret as Secret,
    config?.jwt?.secret_expires as string
  );
  const refreshToken = jwtHelpers.createToken(
    { id: userId, role },
    config.jwt.refresh_secret as Secret,
    config?.jwt?.refresh_secret_expires as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
