import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application data
app.use('/api', usersRouter)
//testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World! its working successfully')
})
export default app
