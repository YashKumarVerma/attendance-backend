import express, { Response, Request } from 'express'

import ExternalOperations from './controller'

// loading interfaces
import { ControllerResponse } from './interface'

const router = express.Router()

router.get('/list/sessions', async (req: Request, res: Response) => {
  const response: ControllerResponse = await ExternalOperations.listAllEvents()

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  })
})

router.post('/post', async ({ body }, res: Response) => {
  const response: ControllerResponse = await ExternalOperations.markAttendance(body)

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  })
})

export default router
