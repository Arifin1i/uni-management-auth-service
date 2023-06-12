import express from 'express'
import { academicSemesterRoutes } from '../modules/AcademicSemester/acaSemester.routes'
import { UserRoutes } from '../modules/users/user.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
