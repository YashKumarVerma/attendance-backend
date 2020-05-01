import logger from '../logger/winston'
import { db } from '../database/mongo'
import { loginParams, signupObject, ControllerResponse } from './interface'
import RESPONSES from '../responses/templates'

/**
 * Class to handle all operations related to Users
 */
class UserOperations {
  /**
   * Static asynchronous method to create a new user
   * @static
   * @async
   * @param req : Request body containing user object, as per signupObject interface
   * @returns ControllerResponse object
   */
  static async createNewUser({ user }: signupObject): Promise<ControllerResponse> {
    try {
      // if incomplete request sent, reject it
      if (!user) {
        return RESPONSES.INCOMPLETE_REQUEST
      }

      //   const cursor = await db.collection('users').find({}).toArray()
      let response = RESPONSES.SUCCESS_OPERATION
      //   response.payload = cursor
      //   logger.info('New User Created Successfully')
      return response

      //   catching errors
    } catch (err) {
      logger.error('Error Creating User')
      return {
        error: true,
        code: err.code || 500,
        message: err.message || 'Undefined',
        payload: err.payload || null,
      }
    }
  }

  /**
   * A method to authenticate user
   * @param user An object containing username and password to login as per loginParams specifications
   * @async
   * @static
   * @returns ControllerResponse object
   */
  static async login({ username, password }: loginParams): Promise<ControllerResponse> {
    try {
      if (!username || !password) {
        return RESPONSES.INCOMPLETE_REQUEST
      }

      logger.info('Login Successful')
      return RESPONSES.SUCCESS_OPERATION

      //   catching errors
    } catch (err) {
      logger.error('Error Logging In')
      return {
        error: true,
        code: err.code,
        message: err.message,
        payload: err.payload,
      }
    }
  }
}

export default UserOperations
