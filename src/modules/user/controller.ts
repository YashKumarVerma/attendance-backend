import logger from '../logger/winston'
import jwt from 'jsonwebtoken'
import { db } from '../database/mongo'
import { loginParams, signupObject, ControllerResponse } from './interface'
import RESPONSES from '../responses/templates'

class UserOperations {
  static async createNewUser({ user }: signupObject): Promise<ControllerResponse> {
    try {
      if (!user) {
        return RESPONSES.INCOMPLETE_REQUEST()
      }

      const dbOperation = await db.collection('users').insertOne(user)
      logger.info('New User Created Successfully')
      return RESPONSES.SUCCESS_OPERATION(null)
      //   const cursor = await db.collection('users').find({}).toArray()
      //   let response = RESPONSES.SUCCESS_OPERATION
      //   response.payload = cursor

      //   catching errors
    } catch (err) {
      logger.error('Error Creating User')
      return RESPONSES.ERROR(err)
    }
  }

  static async login({ username, password }: loginParams): Promise<ControllerResponse> {
    try {
      if (!username || !password) {
        return RESPONSES.INCOMPLETE_REQUEST()
      }

      const cursor = await db.collection('users').findOne({ username, password })
      if (!cursor) {
        return RESPONSES.UNAUTHORIZED()
      }
      const token = jwt.sign({ username: cursor.username, email: cursor.email }, String(process.env.SECRETKEY), {
        expiresIn: '1d',
      })
      return RESPONSES.SUCCESS_OPERATION(token)

      //   catching errors
    } catch (err) {
      logger.error('Error Loggin In')
      return RESPONSES.ERROR(err)
    }
  }
}

export default UserOperations
