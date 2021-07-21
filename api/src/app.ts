import './config/env'
import './config/mongo'
import express, { Application, Request, Response } from 'express'
import requestErrorHandler from './middlewares/RequestErrorHandler'
import userRoutes from './routes/user.routes'

const app: Application = express()
app.use(requestErrorHandler)
app.use(express.json())
app.use('/', userRoutes)

export default app
