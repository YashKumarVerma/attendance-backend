import express from 'express'
import { Request, Response } from 'express'
import logger from '../logger/winston'
import SessionOperations from './controller'
import { SuccessResponse, ErrorResponse } from './interface'

const router = express.Router()

router.post('/create', (req: Request, res: Response): void => {
  SessionOperations.add(req)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
})

router.delete('/:sessionSlug', (req: Request, res: Response): void => {
  SessionOperations.delete(req)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.get('/:sessionSlug', (req: Request, res: Response): void => {
  SessionOperations.getSession(req)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.put('/update', (req: Request, res: Response): void => {
  SessionOperations.update(req)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

export default router
