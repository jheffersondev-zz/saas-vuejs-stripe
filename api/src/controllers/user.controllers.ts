import { Request, Response } from 'express'
import v from 'validator'
import UserServices from '../services/user.services'

const userServices = new UserServices()

export default class UserController {
  async SignUp(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body

      if (name === undefined || name.length < 1) {
        return res
          .status(400)
          .json({ message: 'invalid content from name param' })
      }

      if (email === undefined || v.isEmail(email) === false) {
        return res
          .status(400)
          .json({ message: 'invalid content from email param' })
      }
      if (password === undefined || password.length < 1) {
        return res
          .status(400)
          .json({ message: 'invalid content from password param' })
      }

      const saveUser = await userServices.SignUp({
        name,
        email,
        password,
      })
      return res.status(200).json(saveUser)
    } catch (error) {
      return res.status(500).json({ message: 'unexpected server error' })
    }
  }

  async Login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      if (email === undefined || v.isEmail(email) === false) {
        return res
          .status(400)
          .json({ message: 'invalid content from email param' })
      }
      if (password === undefined || password.length < 1) {
        return res
          .status(400)
          .json({ message: 'invalid content from email param' })
      }

      const authUser = await userServices.Login(email, password)
      return res.json(authUser)
    } catch (error) {
      return res.status(500).json({ message: 'unexpected server error' })
    }
  }
}
