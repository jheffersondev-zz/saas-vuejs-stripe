import './config/env'
import './config/mongo'
import express, { Application } from 'express'
import cors from 'cors'
import requestErrorHandler from './middlewares/RequestErrorHandler'
import userRoutes from './routes/user.routes'
import paymentRoutes from './routes/payment.routes'
import webhookRoute from './routes/webhook.route'

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(requestErrorHandler)

app.use('/', webhookRoute)
app.use('/', userRoutes)
app.use('/', paymentRoutes)

export default app
