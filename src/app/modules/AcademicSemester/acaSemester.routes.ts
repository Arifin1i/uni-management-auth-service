import express from 'express'
import validateRequest from '../../middlewares/validationRequest'
import { academicSemesterValidation } from './acaSemester.validation'
import { academicSemesterController } from './acaSemester.controller'
const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.createSemester
)

export const academicSemesterRoutes = router
