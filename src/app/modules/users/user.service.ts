import { User } from './user.model'
import { IUser } from './user.interface'
import config from '../../../config'
import { generateUserId } from './user.utils/user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto  genareted Id
  const id = await generateUserId()

  user.id = id
  // default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const createUser = await User.create(user)
  if (!createUser) {
    throw new Error('faild to create User')
  }
  return createUser
}

export const userService = {
  createUser,
}
