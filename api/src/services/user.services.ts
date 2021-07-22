import userModel from '../models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from '../config/env'

export default class UserServices {
  async SignUp(name: string, email: string, password: string) {
    try {
      //verify email existence
      let find = await userModel.find({ email }).exec()
      if (find.length >= 1) {
        return { success: false, error: 'email already exists' }
      }

      // hash password
      let salt = await bcrypt.genSaltSync(10)
      let cryptedPass = await bcrypt.hashSync(password, salt)

      await new userModel({
        name,
        email,
        password: cryptedPass,
      }).save()

      return { success: true, body: 'user created' }
    } catch (error) {
      return { success: false, error: error }
    }
  }

  async Login(email: string, password: string) {
    try {
      const find = await userModel.findOne({ email }).exec()
      if (find === null) {
        return { success: false, error: 'invalid/incorrect auth params' }
      }

      let passwordMatch = await bcrypt.compare(password, find.password)
      if (passwordMatch === false) {
        return { success: false, error: 'invalid/incorrect auth params' }
      }

      let authJwt = await jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 30,
          id: find.id,
        },
        env.jwtSecret === undefined ? '' : env.jwtSecret
      )

      return { success: true, body: authJwt }
    } catch (error) {
      return { success: false, error: error }
    }
  }
}
