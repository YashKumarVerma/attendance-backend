import express, { Response, Request } from 'express'

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

router.delete('/:eventSlug', async (req: Request, res: Response) => {
  const response: ControllerResponse = await EventOperations.deleteEvent(req.params.eventSlug, res.locals.client)

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  })
})

router.get('/user/all', async (req: Request, res: Response) => {
  const response: ControllerResponse = await EventOperations.getAllEventsOfUser(res.locals.client)

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  })
})

router.get('/:eventSlug', async (req: Request, res: Response) => {
  const response: ControllerResponse = await EventOperations.getEventDetails(req.params.eventSlug, res.locals.client)

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  })
})

export default router
