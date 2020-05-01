export interface loginParams {
  readonly username: string
  readonly password: string
}

// local interface (with __xx) to define createUser requirements
interface signupRequirement {
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
