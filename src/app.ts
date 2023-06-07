import express, { Application } from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/users/user.routes'
import globalErrorHandler from './app/middleware/golobalErrorHandler'
// import { error } from 'winston'
// import ApiError from './errors/ApiError'

const app: Application = express()

// cors
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Root Routes
app.use('/api/v1/users', userRoutes)

// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
// //  throw new Error("testion error logger")
// })

// GlobalError handler
app.use(globalErrorHandler)

export default app
