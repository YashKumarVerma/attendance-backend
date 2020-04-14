import express from 'express'
import { logger } from '../logger/winston'
import UserOperations from './controller'

const router = express.Router()

router.post('/create', (req: Express.Request, res: Express.Response): void => {
  UserOperations.add(req)
    .then((resp: any) => {
      console.log(resp)
    })
    .catch((error: any) => {
      console.log(error)
    })
})

router.delete(
  '/:username',
  (req: Express.Request, res: Express.Response): void => {
    UserOperations.delete(req)
      .then((resp: any) => {
        console.log(resp)
      })
      .catch((error: any) => {
        console.log(error)
      })
  },
)

router.get(
  '/:username',
  (req: Express.Request, res: Express.Response): void => {
    UserOperations.getUser(req)
      .then((resp: any) => {
        console.log(resp)
      })
      .catch((error: any) => {
        console.log(error)
      })
  },
)

router.put('/update', (req: Express.Request, res: Express.Response): void => {
  UserOperations.update(req)
    .then((resp: any) => {
      console.log(resp)
    })
    .catch((error: any) => {
      console.log(error)
    })
})

export default router
