class RESPONSE {
  static INCOMPLETE_REQUEST() {
    return {
      code: 422,
      error: true,
      message: 'The request was made with incomplete payload(s). One or more parameters missing',
      payload: null,
    }
  }

  static DEFAULT_CATCH() {
    return {
      code: 500,
      error: true,
      message: 'There was an internal server error',
      payload: null,
    }
  }

  static SUCCESS_OPERATION(payload = null) {
    return {
      code: 200,
      error: false,
      message: 'The requested operation completed successfully',
      payload: payload,
    }
  }
}

export default RESPONSE
