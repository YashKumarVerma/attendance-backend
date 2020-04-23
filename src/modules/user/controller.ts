import { Request } from 'express'
import { SuccessResponse } from './interface'
import { UserModel } from './schema'
import { EventModel } from '../event/schema'
import logger from '../logger/winston'
import jwt from 'jsonwebtoken'

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

  static getEvents(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      if (!req.params.username || !req.params.eventSlug) {
        reject({
          error: true,
          message: 'username and event name required to return details',
          payload: {},
        })
      }

      EventModel.findOne({
        admin: req.params.username,
        slug: req.params.eventSlug,
      })
        .then((event) => {
          resolve({
            error: false,
            message: 'event fetch successful',
            payload: event,
          })
        })
        .catch((err) => {
          reject({
            error: true,
            message: 'Error in receiving events',
            payload: err,
          })
        })
    })
  }

  static login(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      if (!req.body.username || !req.body.password) {
        reject({
          error: true,
          message: 'Username and Password both are required for login',
          payload: {},
        })
      }

      UserModel.findOne({
        username: req.body.username,
        password: req.body.password,
      })
        .then((user: any) => {
          if (!user) {
            reject({
              error: true,
              message: 'Invalid Credentials',
              payload: {},
            })
          }
          //   create a jwt token for user
          const token = jwt.sign(
            {
              username: user.username,
              email: user.email,
            },
            String(process.env.SECRETKEY),
            {
              expiresIn: '1d',
            },
          )
          logger.info(`Login Username: ${user.username}`)
          resolve({
            error: false,
            message: 'Login Successful',
            payload: {
              fullname: user.fullName,
              username: user.username,
              profilePicture: user.profilePicture,
              email: user.email,
              token,
            },
          })
        })
        .catch((err) => {
          logger.error('error getting user data')
          reject({
            error: true,
            message: 'Internal Server Error',
            payload: err,
          })
        })
    })
  }
}

export default UserOperations
