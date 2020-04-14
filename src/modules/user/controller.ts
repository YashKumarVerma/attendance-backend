class UserOperations {
  static add(req: Express.Request) {
    return new Promise((resolve: any, reject: any) => {
      resolve({
        message: 'some fancy resolve message',
        error: false,
        payload: null,
      })
    })
  }
  static delete(req: Express.Request) {
    return new Promise((resolve: any, reject: any) => {
      resolve({
        message: 'some fancy resolve message',
        error: false,
        payload: null,
      })
    })
  }
  static getUser(req: Express.Request) {
    return new Promise((resolve: any, reject: any) => {
      resolve({
        message: 'some fancy resolve message',
        error: false,
        payload: null,
      })
    })
  }
  static update(req: Express.Request) {
    return new Promise((resolve: any, reject: any) => {
      resolve({
        message: 'some fancy resolve message',
        error: false,
        payload: null,
      })
    })
  }
}

export default UserOperations
