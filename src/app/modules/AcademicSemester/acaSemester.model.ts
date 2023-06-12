import { Schema, model } from 'mongoose'
import {
  IAcademicSemester,
  academicSemesterModel,
} from './acaSemester.interface'
import {
  academicSemesterCodes,
  academicSemesterTitles,
  academicSemesterMonths,
} from './acaSemester.constant'
import ApiError from '../../../Error/ApiError'
import httpStatus from 'http-status'

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
)
//Handling Same Year and same semester issue
//model er age
AcademicSemesterSchema.pre('save', async function (next) {
  const isExist = await academicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exist !'
    )
  }
  next()
})

export const academicSemester = model<IAcademicSemester, academicSemesterModel>(
  'AcademicSemester',
  AcademicSemesterSchema
)
