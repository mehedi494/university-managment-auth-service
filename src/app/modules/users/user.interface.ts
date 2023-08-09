import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

// instance method interface
// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser> | null>;
//   isPasswordMatched(
//     givenPasword: string,
//     savedPassword: string
//   ): Promise<boolean>;
// };

//  statics method interface
export type IStaticsMethods = {
  isUserExist(
    id: string
  ): Promise<Pick<
    IUser,
    'id' | 'role' | 'password' | 'needsPasswordChange'
  > | null>;

  isPasswordMatched(
    givenPasword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
export type UserModel = Model<IUser, Record<string, unknown>, IStaticsMethods>;
