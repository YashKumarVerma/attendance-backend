import { ObjectId } from 'bson'
import { sessionDetails } from '../sessions/interface'

interface createObjectRequirement {
  _id?: ObjectId
  admin?: string
  sessions?: string[]
  participants?: string[]
  readonly eventName: string
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

export interface eventDetails {
  _id: ObjectId
  slug: string
  admin: string
  eventName: string
  description: string
  participants: [string]
  sessions: [string]
  sessionDetails?: Array<sessionDetails>
}
