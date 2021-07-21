import { Request, Response } from 'express'
import v from 'validator'

export default class UserController {
  async SignUp(req: Request, res: Response) {
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

    res.status(200).send('testing')
  }
}
