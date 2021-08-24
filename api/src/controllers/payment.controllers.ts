import { Request, Response } from 'express'
import PaymentServices from '../services/payment.services'

const paymentServices = new PaymentServices()

export default class PaymentController {
  async Subscription(req: Request, res: Response) {
    const authHeader = req.headers.authorization
    const token = authHeader?.split('Bearer ')[1]

    const subscribe = await paymentServices.CreateSubscription(
      token === undefined ? '' : token
    )

    res.send(subscribe)
  }
}
