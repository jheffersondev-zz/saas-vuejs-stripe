import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'

export default (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    return next()
  }
  return res
    .status(500)
    .json({ message: 'unexpected error happened, try again' })
}
