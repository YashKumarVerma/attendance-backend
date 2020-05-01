import express, { Request, Response } from 'express'

import UserOperations from './controller'

const router = express.Router()

router.post('/create', async (req: Request, res: Response) => {
  try {
    const response = await UserOperations.createNewUser(req)
    res.status(response.code).json({
      error: false,
      message: response.message,
      payload: response.payload,
    })
  } catch (e) {
    res.status(e.code).json({
      error: true,
      message: e.message,
      payload: e.payload,
    })
  }
})

//   UserOperations.add(req)
//     .then((resp: SuccessResponse) => {
//       res.status(200).json(resp)
//     })
//     .catch((error) => {
//       res.status(400).json(error)
//     })

// router.delete('/:username', (req: Request, res: Response): void => {
//   UserOperations.delete(req)
//     .then((resp: SuccessResponse) => {
//       res.json(resp)
//     })
//     .catch((error: any) => {
//       res.json(error)
//     })
// })

// router.get('/:username', (req: Request, res: Response): void => {
//   UserOperations.getUser(req)
//     .then((resp: SuccessResponse) => {
//       res.json(resp) // property send does not exist in response
//     })
//     .catch((error: any) => {
//       res.json(error)
//     })
// })

// router.put('/update', (req: Request, res: Response): void => {
//   UserOperations.update(req)
//     .then((resp: SuccessResponse) => {
//       res.json(resp)
//     })
//     .catch((error: any) => {
//       res.json(error)
//     })
// })

// router.get('/:username/:eventSlug', (req: Request, res: Response): void => {
//   UserOperations.getEvents(req)
//     .then((resp: SuccessResponse) => {
//       res.json(resp)
//     })
//     .catch((error: any) => {
//       res.json(error)
//     })
// })

// router.post('/login', (req: Request, res: Response): void => {
//   UserOperations.login(req)
//     .then((resp: SuccessResponse) => {
//       res.status(200).json(resp)
//     })
//     .catch((error) => {
//       res.status(401).json(error)
//     })
// })

export default router
