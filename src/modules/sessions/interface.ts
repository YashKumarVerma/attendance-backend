import { ObjectId } from 'bson'

interface createObjectRequirement {
  _id?: ObjectId
  admin: string
  participants: string[]
  createdAt: number
  readonly parent: string
  readonly slug: string
  readonly sessionName: string
  readonly endTime: number
  readonly startTime: number
  readonly overtimePermission: boolean
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

export interface sessionDetails {
  _id: ObjectId
  parent: string
  participants: [string]
  slug: string
  sessionName: string
  endTime: number
  startTime: number
  createdAt: number
  overtimePermission: boolean
  admin: string
}
