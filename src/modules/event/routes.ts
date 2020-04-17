import express, { Request, Response } from 'express'

import EventOperations from './controller'
import { SuccessResponse } from './interface'

const router = express.Router()

router.post('/create', (req: Request, res: Response): void => {
  EventOperations.add(req)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
})

router.delete('/:eventSlug', (req: Request, res: Response): void => {
  EventOperations.delete(req)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.get('/:eventSlug', (req: Request, res: Response): void => {
  EventOperations.getEvent(req)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.put('/:eventSlug/update', (req: Request, res: Response): void => {
  EventOperations.update(req)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.put('/:eventSlug/participant', (req: Request, res: Response): void => {
  EventOperations.addParticipant(req)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.put('/:eventSlug/session', (req: Request, res: Response): void => {
  EventOperations.addSession(req)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

export default router
