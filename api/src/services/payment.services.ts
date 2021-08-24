import Stripe from 'stripe'
import jwt from 'jsonwebtoken'
import env from '../config/env'
import userModel from '../models/user.model'

const stripe = new Stripe(
  env.stripe.publicKey === undefined ? '' : env.stripe.publicKey,
  {
    apiVersion: '2020-08-27',
  }
)

export default class PaymentServices {
  /*
    Retrieve or create a customer if not exists or if not valid on stripe
  */
  async Customer(user: any) {
    try {
      let stripeCustomerId: string = ''
      let createNewCustomer = true

      // verify if user have a customer id
      if (user.customerDetails.stripeCustomerId !== null) {
        stripeCustomerId = user.customerDetails.stripeCustomerId

        // check on stripe if the current customer is valid
        const customer = await stripe.customers.retrieve(stripeCustomerId)

        if (customer.deleted !== undefined || customer.deleted !== null) {
          createNewCustomer = false
        }
      }

      if (createNewCustomer === true) {
        const createCustomer = await stripe.customers.create({
          name: user.name,
          email: user.email,
        })
        await userModel.updateOne(
          { _id: user.id },
          {
            customerDetails: {
              stripeCustomerId: createCustomer.id,
            },
          }
        )
      }

      return { success: false, body: stripeCustomerId }
    } catch (error) {
      return { success: false, error }
    }
  }

  async CreateSubscription(token: string) {
    try {
      const decodedToken = await (<any>jwt.decode(token))

      const user = await userModel.find({
        _id: decodedToken.id === null ? '' : decodedToken.id,
      })

      if (user.length === 0) {
        return {
          success: false,
          error: 'unexpected error, please, make login again',
        }
      }

      const fetchCustomer = await this.Customer(user[0])
      if (fetchCustomer.success === false) {
        return fetchCustomer
      }
    } catch (error) {
      return { success: false, error }
    }
  }
}
