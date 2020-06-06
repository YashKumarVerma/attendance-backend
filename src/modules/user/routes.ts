import express, { Response } from 'express'

import UserOperations from './controller'

import { ControllerResponse } from './interface'

const router = express.Router()

router.post('/create', async ({ body }, res: Response) => {
  const response: ControllerResponse = await UserOperations.createNewUser(body)

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  })
})

router.post('/login', async ({ body }, res: Response) => {
  const response: ControllerResponse = await UserOperations.login(body)

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  })
})

export default router
