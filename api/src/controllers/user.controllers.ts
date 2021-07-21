import { Request, Response } from 'express'
import userServices from '../services/user.services'
import v from 'validator'

const UserServices = new userServices()

export default class UserController {
  async SignUp(req: Request, res: Response) {
    try {
      let { name, email, password } = req.body

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

      let saveUser = await UserServices.SignUp(name, email, password)
      res.status(200).json(saveUser)
    } catch (error) {
      return res.status(500).json({ message: 'unexpected server error' })
    }
  }

  async Login(req: Request, res: Response) {
    try {
      let { email, password } = req.body

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

      let authUser = await UserServices.Login(email, password)
      return res.json(authUser)
    } catch (error) {
      return res.status(500).json({ message: 'unexpected server error' })
    }
  }
}
