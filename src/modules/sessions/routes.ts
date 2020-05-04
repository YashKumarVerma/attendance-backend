import express, { Response } from 'express'

import SessionOperations from './controller'

// loading interfaces
import { ControllerResponse } from './interface'

const router = express.Router()

router.post('/create', async ({ body }, res: Response) => {
  const response: ControllerResponse = await SessionOperations.createNewSession(body, res.locals.client)

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  })
})

router.delete('/delete', async ({ body }, res: Response) => {
  const response: ControllerResponse = await SessionOperations.deleteSession(body, res.locals.client)

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  })
})

export default router
