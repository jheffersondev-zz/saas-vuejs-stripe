import jwt from 'jsonwebtoken'
import userModel from '../models/user.model'
import stripe from '../config/stripe'

export default class PaymentServices {
  // create a customer and returns customerId
  async CustomerCreate(user: any) {
    try {
      let stripeCustomerId = ''
      const createCustomer = await stripe.customers.create({
        name: user.name,
        email: user.email,
      })

      stripeCustomerId = createCustomer.id

      return { success: true, customerId: stripeCustomerId }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // retrieve or create and update on DB a customer if not exists or if not valid on stripe
  async CustomerFindOrCreate(user: any) {
    try {
      let stripeCustomerId: string = ''
      let createNewCustomer: boolean = true

      // verify if user have a customer id
      if (user.stripe.stripeCustomerId !== null) {
        stripeCustomerId = user.stripe.stripeCustomerId

        // check on stripe if the current customer is valid
        const customer = await stripe.customers.retrieve(stripeCustomerId)
        if (customer.deleted === true || customer.deleted !== undefined) {
          createNewCustomer = true
        } else {
          return { success: true, customerId: stripeCustomerId }
        }
      }

      if (createNewCustomer === true) {
        const createCustomer = await stripe.customers.create({
          name: user.name,
          email: user.email,
        })

        stripeCustomerId = createCustomer.id

        // update user with a created customerId on database
        await userModel.updateOne(
          { _id: user.id },
          {
            stripe: {
              stripeCustomerId: createCustomer.id,
              stripeSubscriptionId: user.stripeSubscriptionId,
            },
          }
        )
      }

      return { success: true, customerId: stripeCustomerId }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async CreateSubscription(
    token: string,
    paymentMethodId: string,
    priceId: string
  ) {
    try {
      const decoded = await (<any>jwt.decode(token))
      const findUser: any = await userModel.findOne({ _id: decoded.id }).exec()

      if (findUser.length === 0) {
        return {
          success: false,
          error: 'unexpected error, please, make login again',
        }
      }

      const user = findUser

      // user only can have one active subscription
      if (
        user.stripe.stripeSubscriptionId != null ||
        // eslint-disable-next-line eqeqeq
        user.stripe.stripeSubscriptionId != undefined
      ) {
        return {
          success: false,
          error: 'You already have a active subscription',
        }
      }

      // tries to get or create a customer if does exist
      const fetchCustomer = await this.CustomerFindOrCreate(user)
      if (
        fetchCustomer.success === false ||
        fetchCustomer.customerId === undefined
      ) {
        return fetchCustomer
      }

      // attaches the new payment method to the user
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: fetchCustomer.customerId,
      })

      // define the current payment method as default
      await stripe.customers.update(user.stripe.stripeCustomerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      })

      // creates a subscription
      const subscription = await stripe.subscriptions.create({
        customer: fetchCustomer.customerId,
        items: [{ price: priceId }],
        expand: ['latest_invoice.payment_intent'],
      })

      await userModel.updateOne(
        { _id: user.id },
        {
          stripe: {
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: fetchCustomer.customerId,
          },
        }
      )

      return {
        success: true,
        subscription,
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}
