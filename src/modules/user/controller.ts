import { Request } from 'express'
import { SuccessResponse } from './interface'
import { UserModel } from './schema'
import logger from '../logger/winston'

class UserOperations {
  static add(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      try {
        UserModel.create(req.body.user)
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

  static delete(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      if (!req.params.username) {
        reject({
          error: true,
          message: 'username required to remove user',
          payload: {},
        })
      }

      const { username } = req.params
      try {
        UserModel.deleteOne({ username })
          .then((resp) => {
            if (resp.deletedCount === 1) {
              resolve({
                error: false,
                message: 'user deletion successful',
                payload: {},
              })
            }
            reject({
              error: true,
              message: 'username not found',
              payload: 'username not found',
            })
          })
          .catch((err) => {
            logger.error('error in deleting user')
            reject({
              error: true,
              message: 'unexpected error in deleting user',
              payload: err,
            })
          })
      } catch (error) {
        reject({
          error: true,
          message: 'unexpected error in deleting user',
          payload: error,
        })
      }
    })
  }

  static getUser(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      if (!req.params.username) {
        reject({
          error: true,
          message: 'username required to return details',
          payload: {},
        })
      }

      UserModel.findOne({ username: req.params.username })
        .then((user) => {
          if (!user) {
            reject({
              error: true,
              message: 'user not found',
              payload: {},
            })
          }
          resolve({
            error: false,
            message: 'user details found',
            payload: user,
          })
        })
        .catch((err) => {
          logger.error('error getting user data')
          reject({
            error: true,
            message: 'unexpected error fetching user data',
            payload: err,
          })
        })
    })
  }

  static update(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      // check if username to be updated actually exists
      if (!req.body.user || !req.body.user._id) {
        reject({
          error: true,
          message: 'user_id needed to update document',
          payload: {},
        })
      }

      UserModel.findByIdAndUpdate(req.body.user._id, { $set: req.body.user })
        .exec()
        .then(() => {
          resolve({
            error: false,
            message: 'user update successful',
            payload: {},
          })
        })
        .catch((err) => {
          logger.error('error updating user')
          reject({
            error: true,
            message: 'error updating user by id',
            payload: err,
          })
        })
    })
  }
}

export default UserOperations
