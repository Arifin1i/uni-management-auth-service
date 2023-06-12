import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import router from './app/Routers'
import httpStatus from 'http-status'
// import ApiError from './Error/ApiError'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application route
app.use('/api/v1/', router)

// console.log(app.get('env'))

//testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
// throw new ApiError(400, 'Hello World! its working successfully')
// console.log(x)
// })

//global error handler
app.use(globalErrorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app

/*
1. console.log(app.get('env')) কাজ করে না
2. @typescript-eslint/consistent-type-definitions এর বদলে 
  consistent-type-definitions দিলে লাল বাত্তি জ্বালায় রাখে
*/
