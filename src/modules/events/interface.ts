import { ObjectId } from 'bson'

// local interface (with __xx) to define createUser requirements
interface createObjectRequirement {
  _id?: ObjectId
  admin?: string
  sessions?: string[]
  participants?: string[]
  readonly name: string
  readonly slug: string
  readonly description: string
}

export interface createObject {
  event: createObjectRequirement
}

// interface for all controller responses
export interface ControllerResponse {
  code: number
  error: boolean
  message: string
  payload: any
}

export interface clientTokenData {
  readonly username: string
  readonly email: string
  readonly iat: number
  readonly exp: number
}
