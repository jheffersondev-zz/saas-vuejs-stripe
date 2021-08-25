import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from '../config/env'
import UserModel from '../models/user.model'

interface IUser {
  name: string
  gender: string
  birthDate: string
  email: string
  password: string
}

export default class UserServices {
  async SignUp(user: IUser) {
    try {
      // verify email existence
      const find = await UserModel.find({ email: user.email }).exec()
      if (find.length >= 1) {
        return { success: false, error: 'email already exists' }
      }

      // hash password
      const salt = await bcrypt.genSaltSync(10)
      const cryptedPass = await bcrypt.hashSync(user.password, salt)

      await new UserModel({
        name: user.name,
        gender: user.gender,
        birthDate: user.birthDate,
        email: user.email,
        password: cryptedPass,
        stripe: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
      }).save()

      return { success: true, body: 'user created' }
    } catch (error) {
      return { success: false, error }
    }
  }

  async Login(email: string, password: string) {
    try {
      const find = await UserModel.findOne({ email }).exec()
      if (find === null) {
        return { success: false, error: 'invalid/incorrect auth params' }
      }

      const passwordMatch = await bcrypt.compare(password, find.password)
      if (passwordMatch === false) {
        return { success: false, error: 'invalid/incorrect auth params' }
      }

      const authJwt = await jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 30,
          id: find.id,
        },
        env.jwtSecret === undefined ? '' : env.jwtSecret
      )

      return { success: true, body: authJwt }
    } catch (error) {
      return { success: false, error }
    }
  }
}
