import express from 'express'
import PaymentController from '../controllers/payment.controllers'
import LoginAuthorization from '../middlewares/LoginAuthorization'

const app = express.Router()
const paymentController = new PaymentController()

app.post('/subscription', LoginAuthorization, paymentController.Subscription)
app.get('/charges', LoginAuthorization, paymentController.RetrieveCharges)
app.get(
  '/payment-methods',
  LoginAuthorization,
  paymentController.RetrievePaymentMethods
)
app.get(
  '/subscription',
  LoginAuthorization,
  paymentController.RetrieveSubscription
)

export default app
