import { Request, Response } from 'express'
import PaymentServices from '../services/payment.services'

const paymentServices = new PaymentServices()

export default class PaymentController {
  async Subscription(req: Request, res: Response) {
    const authHeader = req.headers.authorization
    const token = authHeader?.split('Bearer ')[1]

    const { paymentMethodId, priceId } = req.body

    if (paymentMethodId === undefined || paymentMethodId.length < 1) {
      return res
        .status(400)
        .json({ message: 'invalid or missing paymentMethodId' })
    }

    if (priceId === undefined || priceId.length < 1) {
      return res.status(400).json({ message: 'invalid or missing priceId' })
    }

    const subscribe = await paymentServices.CreateSubscription(
      token === undefined ? '' : token,
      paymentMethodId,
      priceId
    )

    return res.send(subscribe)
  }
}
