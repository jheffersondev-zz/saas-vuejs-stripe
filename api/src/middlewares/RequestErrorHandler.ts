import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'

export default function (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!err) {
    return next()
  } else {
    res.status(500).json({ message: 'unexpected error happened, try again' })
  }
}
