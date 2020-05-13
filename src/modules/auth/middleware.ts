import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import logger from '../logger/winston'
import RESPONSE from '../responses/templates'

const authMiddleware = (req: Request, res: Response, next: any): any => {
  // if headers dont exist
  if (!req.headers.authorization) {
    logger.warn('Request Without Token Denied')
    return res.status(RESPONSE.BAD_REQUEST().code).json({ ...RESPONSE.BAD_REQUEST() })
  }

  //   try ripping apart the header to see if data sent in correct format
  const auth = req.headers.authorization.split(' ')
  if (auth.length !== 2) {
    logger.warn('Request in improper format: Send as Bearer token')
    return res.status(RESPONSE.BAD_REQUEST().code).json({ ...RESPONSE.BAD_REQUEST() })
  }

  let data
  try {
    data = jwt.verify(auth[1], String(process.env.secretkey))
  } catch (e) {
    return res.status(RESPONSE.FORBIDDEN().code).json({ ...RESPONSE.FORBIDDEN() })
  }

  res.locals.client = data
  return next()
}

export default authMiddleware
