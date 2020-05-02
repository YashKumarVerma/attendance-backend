import express, { Response } from 'express'

import EventOperations from './controller'

// loading interfaces
import { ControllerResponse } from './interface'

const router = express.Router()

router.post('/create', async ({ body }, res: Response) => {
  const response = (await EventOperations.createNewEvent(body, res.locals.client)) as ControllerResponse

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  })
})

export default router
