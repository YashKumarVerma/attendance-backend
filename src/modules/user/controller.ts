import { SuccessResponse, ErrorResponse } from './interface'
import UserSchema from './schema'
import logger from '../logger/winston'
import { Request, Response } from 'express'

class UserOperations {
  static add(req: Request) {
    console.log(req.body)
    return new Promise<SuccessResponse>((resolve, reject) => {
      try {
        UserSchema.create(req.body.user)
          .then((resp) => {
            resolve({
              error: false,
              message: 'User created successfully',
              payload: resp,
            })
          })
          .catch((error: any) => {
            if (error.errmsg) {
              logger.error(`DB : ${error.errmsg}`)
              reject({
                error: true,
                payload: error,
                message: 'error in db operation to create a new user',
              })
            }

            if (error.errors) {
              logger.error(`Validation: ${error.message}`)
              reject({
                error: true,
                message: 'Validation Error',
                payload: error,
              })
            }

            // if no errors, then resolve with success
            reject({
              error: true,
              message: 'Unexpected error',
              payload: {},
            })
          })
      } catch (e) {
        reject({
          error: true,
          message: 'unexpected error in creating new user',
          payload: e,
        })
      }
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
