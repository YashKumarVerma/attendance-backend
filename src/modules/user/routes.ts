import express, { Response } from 'express'

// import cors from 'cors'
import UserOperations from './controller'

import { ControllerResponse } from './interface'

const router = express.Router()

router.post('/create', async ({ body }, res: Response) => {
  const response = (await UserOperations.createNewUser(body)) as ControllerResponse

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  })
})

router.post('/login', async ({ body }, res: Response) => {
  const response = (await UserOperations.login(body)) as ControllerResponse

  res.status(response.code).json({
    error: response.error,
    message: response.message,
    payload: response.payload,
  })
})

export default router
