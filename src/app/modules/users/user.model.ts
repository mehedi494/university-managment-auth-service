import { Model, Schema, model } from 'mongoose'
import { IUser } from './user.interface'
type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser, UserModel>('User', userSchema)
