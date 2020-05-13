class RESPONSE {
  static INCOMPLETE_REQUEST() {
    return {
      code: 422,
      error: true,
      message: 'The request was made with incomplete payload(s). One or more parameters missing',
      payload: null,
    }
  }

  static SUCCESS_OPERATION(payload?: any) {
    return {
      code: 200,
      error: false,
      message: 'The requested operation completed successfully',
      payload,
    }
  }

  static UNAUTHORIZED() {
    return {
      code: 401,
      error: true,
      message: 'Unauthorized Access Denied',
      payload: null,
    }
  }

  static NOT_FOUND() {
    return {
      code: 404,
      error: true,
      message: 'Action on a non existing resource was done, therefore not found',
      payload: null,
    }
  }

  static DUPLICATE() {
    return {
      code: 409,
      error: true,
      message: 'Expected unique value, got duplicate',
      payload: null,
    }
  }

  static BAD_REQUEST() {
    return {
      code: 400,
      error: true,
      message: 'Request was received in bad format',
      payload: null,
    }
  }

  static FORBIDDEN() {
    return {
      code: 403,
      error: true,
      message: 'Request forbidden',
      payload: null,
    }
  }

  static ERROR(errorObject: any) {
    // check if error type is a database error
    if (errorObject.name === 'MongoError') {
      if (errorObject.code === 11000) {
        return {
          code: 409,
          error: true,
          message: 'Expected unique value, got duplicate',
          payload: null,
        }
      }
    }

    // base case
    return {
      code: 500,
      error: true,
      message: 'Internal Server Error',
      payload: null,
    }
  }
}

export default RESPONSE
