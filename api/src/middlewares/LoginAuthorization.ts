import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import v from 'validator'
import env from '../config/env'

export default function (req: Request, res: Response, next: NextFunction) {
  let authHeader = req.headers.authorization
  let token = authHeader?.split('Bearer ')[1]

  if (!token || v.isJWT(token) === false) {
    return res.status(403).json({
      message:
        "You're not authorized to access this resources, please do login or sent a valid authorization token",
    })
  }

  try {
    jwt.verify(token, env.jwtSecret === undefined ? '' : env.jwtSecret)
    next()
  } catch (err) {
    return res.status(403).json({
      message:
        "You're not authorized to access this resources, please do login or sent a valid authorization token",
    })
  }
}
