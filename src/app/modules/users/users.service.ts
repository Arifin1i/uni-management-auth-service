import config from '../../../config/index'
import { generateUserId } from './users.utilities'
import { IUser } from './users.interface'
import User from './users.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()
  user.id = id

  //creating new user
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('fail to create user!')
  }
  return createdUser
}
export default { createUser }
