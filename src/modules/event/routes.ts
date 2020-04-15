import express from 'express'
import { Request, Response } from 'express'
import logger from '../logger/winston'
import EventOperations from './controller'
import { SuccessResponse, ErrorResponse } from './interface'

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

router.put('/update', (req: Request, res: Response): void => {
  EventOperations.update(req)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

export default router
