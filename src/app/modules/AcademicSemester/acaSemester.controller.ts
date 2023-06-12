import { NextFunction, Request, Response } from 'express'
import { academicSemesterService } from './acaSemester.service'
import catchAsync from '../../../Shared/catchAsync'
import sendReponse from '../../../Shared/sendResponse'
import httpStatus from 'http-status'
import { IAcademicSemester } from './acaSemester.interface'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await academicSemesterService.createSemester(
      academicSemesterData
    )
    next()
    sendReponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    })
    next()
  }
)
// const getAllSemester = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const paginationOptions = {
//       page:  Number(req.query.page),
//       limit:  Number(req.query.limit),
//       sortBy:  req.query.sortBy,
//       sortOrder:  req.query.sortOrder
//     }

//   }
// )
export const academicSemesterController = { createSemester }
