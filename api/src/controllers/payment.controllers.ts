import { Request, Response } from 'express'
import paymentServices from '../services/payment.services'

const PaymentServices = new paymentServices()

export default class PaymentController {
  async Subscription(req: Request, res: Response) {
    let authHeader = req.headers.authorization
    let token = authHeader?.split('Bearer ')[1]

    let subscribe = await PaymentServices.CreateSubscription(
      token === undefined ? '' : token
    )

    res.send(subscribe)
  }
}
