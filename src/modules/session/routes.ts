import express, { Request, Response } from 'express'

import SessionOperations from './controller'
import { SuccessResponse } from './interface'

const router = express.Router()

router.post('/create', (req: Request, res: Response): void => {
  SessionOperations.add(req, res)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
})

router.delete('/:sessionSlug', (req: Request, res: Response): void => {
  SessionOperations.delete(req, res)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.get('/:sessionSlug', (req: Request, res: Response): void => {
  SessionOperations.getSession(req, res)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.put('/:sessionSlug/update', (req: Request, res: Response): void => {
  SessionOperations.update(req, res)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

router.put('/:sessionSlug/participant', (req: Request, res: Response): void => {
  SessionOperations.addParticipant(req, res)
    .then((resp: SuccessResponse) => {
      res.status(200).json(resp)
    })
    .catch((error: any) => {
      res.status(400).json(error)
    })
})

export default router
