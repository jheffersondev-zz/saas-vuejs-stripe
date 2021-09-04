import './config/env'
import './config/mongo'
import express, { Application } from 'express'
import cors from 'cors'
import requestErrorHandler from './middlewares/RequestErrorHandler'
import userRoutes from './routes/user.routes'
import paymentRoutes from './routes/payment.routes'

const app: Application = express()
app.use(cors())
app.use(requestErrorHandler)
app.use(express.json())

app.use('/', userRoutes)
app.use('/', paymentRoutes)

export default app
