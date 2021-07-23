import express from 'express'
import paymentController from '../controllers/payment.controllers'
import BodyContentValidator from '../middlewares/BodyContentValidator'
import LoginAuthorization from '../middlewares/LoginAuthorization'

const app = express.Router()
const PaymentController = new paymentController()

app.post('/subscription', LoginAuthorization, PaymentController.Subscription)

export default app
