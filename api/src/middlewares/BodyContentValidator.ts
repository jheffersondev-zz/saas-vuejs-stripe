import { Request, Response, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
  if (
    Object.keys(req.body).length === undefined ||
    Object.keys(req.body).length === 0
  ) {
    return res.status(400).json({ message: 'params missing, try again' })
  }
  next()
}
