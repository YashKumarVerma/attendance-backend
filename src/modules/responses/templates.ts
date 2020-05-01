const RESPONSES = {
  // items for error type
  INCOMPLETE_REQUEST: {
    code: 422,
    error: true,
    message: 'The request was made with incomplete payload(s). One or more parameters missing',
    payload: null,
  },

  DEFAULT_CATCH: {
    code: 500,
    error: true,
    message: 'There was an internal server error',
    payload: null,
  },

  //   items for success
  SUCCESS_OPERATION: {
    code: 200,
    error: false,
    message: 'The requested operation completed successfully',
    payload: null,
  },
}

export default RESPONSES
