import ApiError from '../../../Error/ApiError'
import { academicSemesterTitleCodeMapper } from './acaSemester.constant'
import { IAcademicSemester } from './acaSemester.interface'
import { academicSemester } from './acaSemester.model'
import httpStatus from 'http-status'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  //title এর সাথে code যেন মিলে যায়, না মিললে error
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Code')
  }
  const result = await academicSemester.create(payload)
  return result
}
// const ge
export const academicSemesterService = { createSemester }
