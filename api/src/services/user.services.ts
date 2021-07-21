import userModel from '../models/user.model'
import bcrypt from 'bcrypt'

export default class UserServices {
  async SignUp(name: string, email: string, password: string) {
    try {
      //verify email existence
      let find = await userModel.find({ email })
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
}
