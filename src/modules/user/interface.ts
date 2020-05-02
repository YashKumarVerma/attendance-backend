import { ObjectId } from 'bson'

export interface loginParams {
  readonly username: string
  readonly password: string
}

// local interface (with __xx) to define createUser requirements
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

// interface for all controller responses
export interface ControllerResponse {
  code: number
  error: boolean
  message: string
  payload: any
}
