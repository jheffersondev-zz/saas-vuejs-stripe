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

  async RetrieveCharges(req: Request, res: Response) {
    try {
      const customer = res.locals.user.stripe.stripeCustomerId

      if (customer === undefined || customer.length < 1) {
        return res.status(400).json({ message: 'invalid or missing customer' })
      }

      const charges = await paymentServices.RetrieveCharges(customer)
      return res.status(200).json(charges)
    } catch (error: any) {
      return res.status(500).json({ error })
    }
  }

  async RetrievePaymentMethods(req: Request, res: Response) {
    try {
      const customerId = res.locals.user.stripe.stripeCustomerId

      if (customerId === undefined || customerId.length < 1) {
        return res.status(400).json({ message: 'invalid or missing customer' })
      }

      const customer = await paymentServices.RetrievePaymentMethods(customerId)
      return res.status(200).json(customer)
    } catch (error: any) {
      return res.status(500).json({ error })
    }
  }

  async RetrieveSubscription(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id

      const subscription = await paymentServices.RetrieveSubscription(userId)
      return res.status(200).json(subscription)
    } catch (error: any) {
      return res.status(500).json({ error })
    }
  }
}
