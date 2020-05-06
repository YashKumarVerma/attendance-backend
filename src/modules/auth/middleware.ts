import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import logger from '../logger/winston'

const authMiddleware = (req: Request, res: Response, next: any): any => {
  // if headers dont exist
  if (!req.headers.authorization) {
    logger.warn('Request Without Token Denied')
    return res.status(400).json({
      error: true,
      message: 'Not allowed without headers',
      payload: undefined,
    })
  }

  //   try ripping apart the header to see if data sent in correct format
  const auth = req.headers.authorization.split(' ')
  if (auth.length !== 2) {
    logger.warm('Request in improper format: Send as Bearer token')
    return res.status(400).json({
      error: true,
      message: 'Invalid Header String',
      payload: undefined,
    })
  }

  let data
  try {
    data = jwt.verify(auth[1], String(process.env.secretkey))
  } catch (e) {
    return res.status(403).json({
      error: true,
      message: 'Unauthorized Accedd Denied',
      payload: undefined,
    })
  }

  res.locals.client = data
  return next()
}

export default authMiddleware
