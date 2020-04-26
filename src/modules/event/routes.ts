import express, { Request, Response } from 'express'

import EventOperations from './controller'
import { SuccessResponse } from './interface'

const router = express.Router()

router.get('/list', (req: Request, res: Response): void => {
  EventOperations.listAllUserEvents(req, res)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.get('/:eventSlug', (req: Request, res: Response): void => {
  EventOperations.getEvent(req, res)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.post('/create', (req: Request, res: Response): void => {
  EventOperations.add(req, res)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
})

router.put('/:eventSlug/update', (req: Request, res: Response): void => {
  EventOperations.update(req, res)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.put('/:eventSlug/participant', (req: Request, res: Response): void => {
  EventOperations.addParticipant(req, res)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.put('/:eventSlug/session', (req: Request, res: Response): void => {
  EventOperations.addSession(req, res)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.delete('/:eventSlug', (req: Request, res: Response): void => {
  EventOperations.delete(req, res)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

export default router
