import { Request } from 'express'

export interface SuccessResponse {
  error: boolean
  message: string
  payload: any
}
