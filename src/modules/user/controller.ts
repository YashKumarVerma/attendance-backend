import { SuccessResponse, ErrorResponse } from './interface'

class UserOperations {
  static add(req: any) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      resolve({
        message: 'some fancy resolve message',
        error: false,
        payload: 'some data',
      })
    })
  }

  static delete(req: Express.Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      resolve({
        message: 'some fancy resolve message',
        error: false,
        payload: 'some data',
      })
    })
  }

  static getUser(req: Express.Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      resolve({
        message: 'some fancy resolve message',
        error: false,
        payload: 'some data',
      })
    })
  }

  static update(req: Express.Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      resolve({
        message: 'some fancy resolve message',
        error: false,
        payload: 'some data',
      })
    })
  }
}

export default UserOperations
