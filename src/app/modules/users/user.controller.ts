import { NextFunction, Request, RequestHandler, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../Shared/catchAsync'
import { IUser } from './user.interface'
import httpStatus from 'http-status'
import sendReponse from '../../../Shared/sendResponse'

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    const result = await UserService.createUser(user)

    sendReponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    })
    next()
  }
)

export const UserController = {
  createUser,
}
