import { ObjectId } from 'bson'

interface createObjectRequirement {
  _id?: ObjectId
  admin: string
  participants: string[]
  createdAt: number
  readonly startAt: number
  readonly endAt: number
  readonly overtimeAllowed: boolean
  readonly parent: string
  readonly name: string
  readonly slug: string
  readonly description: string
}

export interface createObject {
  session: createObjectRequirement
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

interface deleteObjectRequirement {
  parent: string
  slug: string
}

export interface deleteObject {
  session: deleteObjectRequirement
}
