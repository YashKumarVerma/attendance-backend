import { ObjectId } from 'bson'

export interface loginParams {
  readonly username: string
  readonly password: string
}

interface signupRequirement {
  _id?: ObjectId
  readonly username: string
  readonly fullName: string
  readonly email: string
  readonly password: string
}

export interface signupObject {
  user: signupRequirement
}

export interface ControllerResponse {
  code: number
  error: boolean
  message: string
  payload: any
}
