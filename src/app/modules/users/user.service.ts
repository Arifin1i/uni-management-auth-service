import config from '../../../config/index'
import { IUser } from './user.interface'
import ApiError from '../../../Error/ApiError'
import { generateUserId } from './user.utilities'
import { User } from './user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()
  user.id = id

  //creating new user
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'fail to create user!')
  }
  return createdUser
}
export const UserService = { createUser }
