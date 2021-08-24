import express from 'express'
import PaymentController from '../controllers/payment.controllers'
import LoginAuthorization from '../middlewares/LoginAuthorization'

const app = express.Router()
const paymentController = new PaymentController()

app.post('/subscription', LoginAuthorization, paymentController.Subscription)

export default app
