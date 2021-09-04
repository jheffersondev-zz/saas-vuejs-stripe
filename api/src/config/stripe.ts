import Stripe from 'stripe'
import env from './env'

const stripe = new Stripe(
  env.stripe.publicKey === undefined ? '' : env.stripe.publicKey,
  {
    apiVersion: '2020-08-27',
  }
)

export default stripe
