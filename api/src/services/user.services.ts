import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from '../config/env'
import UserModel from '../models/user.model'
import PaymentServices from './payment.services'

const paymentServices = new PaymentServices()

interface IUser {
  name: string
  email: string
  password: string
}

export default class UserServices {
  async SignUp(user: IUser) {
    try {
      // verify email existence
      const find = await UserModel.find({ email: user.email }).exec()
      if (find.length >= 1) {
        return {
          success: false,
          error: 'This email is already being used',
        }
      }

      // hash password
      const salt = await bcrypt.genSaltSync(10)
      const cryptedPass = await bcrypt.hashSync(user.password, salt)

      const createCustomer = await paymentServices.CustomerCreate({
        name: user.name,
        email: user.email,
      })

      if (createCustomer.success === false) {
        return createCustomer
      }

      const newUser = await new UserModel({
        name: user.name,
        email: user.email,
        password: cryptedPass,
        stripe: {
          stripeCustomerId: createCustomer.customerId,
          stripeSubscriptionId: null,
        },
      }).save()

      const authJwt = await jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 36000,
          id: newUser.id,
          name: user.name,
          email: user.email,
          stripe: {
            stripeCustomerId: createCustomer.customerId,
            stripeSubscriptionId: null,
          },
        },
        env.jwtSecret === undefined ? '' : env.jwtSecret
      )

      return {
        success: true,
        body: 'Account has sucessfully created',
        shortBody: 'user_created',
        user: {
          id: newUser.id,
          name: user.name,
          email: user.email,
          stripe: {
            stripeCustomerId: createCustomer.customerId,
            stripeSubscriptionId: null,
          },
        },
        token: authJwt,
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async Login(email: string, password: string) {
    try {
      const find = await UserModel.findOne({ email }).exec()
      if (find === null) {
        return { success: false, error: 'Unrecognized email or password' }
      }

      const passwordMatch = await bcrypt.compare(password, find.password)
      if (passwordMatch === false) {
        return { success: false, error: 'Unrecognized email or password' }
      }

      const authJwt = await jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 36000,
          id: find.id,
          name: find.name,
          email: find.email,
          stripe: find.stripe,
        },
        env.jwtSecret === undefined ? '' : env.jwtSecret
      )

      return {
        success: true,
        body: 'Successfully logged in',
        shortBody: 'user_authenticated',
        user: {
          _id: find.id,
          name: find.name,
          email: find.email,
          stripe: find.stripe,
        },
        token: authJwt,
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}
