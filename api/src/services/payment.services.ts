import env from '../config/env'
import Stripe from 'stripe'

const stripe = new Stripe(
  env.stripe.publicKey === undefined ? '' : env.stripe.publicKey,
  {
    apiVersion: '2020-08-27',
  }
)

interface ISubscriptionDetails {
  name: string
  email: string
}

export default class PaymentServices {
  async Subscription(details: ISubscriptionDetails) {}
}
