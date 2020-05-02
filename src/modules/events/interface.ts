import { ObjectId } from 'bson'

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
