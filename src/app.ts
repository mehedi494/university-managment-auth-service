import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRoute from '../src/app/modules/users/user.routes'

const app: Application = express()

// cors
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Root ROutes
app.use('/api/v1/users', userRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Server get started rocking! 🎇🧨')
})

export default app
