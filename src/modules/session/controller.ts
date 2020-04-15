import logger from '../logger/winston'
import { SessionModel } from './schema'
import { Request, Response } from 'express'
import { SuccessResponse, ErrorResponse } from './interface'

class SessionOperations {
  static add(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      try {
        SessionModel.create(req.body.session)
          .then((resp) => {
            resolve({
              error: false,
              message: 'Session created successfully',
              payload: resp,
            })
          })
          .catch((error: any) => {
            if (error.errmsg) {
              logger.error(`DB : ${error.errmsg}`)
              reject({
                error: true,
                payload: error,
                message: 'error in db operation to create a new session',
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
          message: 'unexpected error in creating new session',
          payload: e,
        })
      }
    })
  }

  static delete(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      if (!req.params.sessionSlug) {
        reject({
          error: true,
          message: 'session slug required to delete session',
          payload: {},
        })
      }

      try {
        SessionModel.deleteOne({ slug: req.params.sessionSlug })
          .then((resp) => {
            if (resp.deletedCount === 1) {
              resolve({
                error: false,
                message: 'session deletion successful',
                payload: {},
              })
            }
            reject({
              error: true,
              message: 'session not found',
              payload: {},
            })
          })
          .catch((err) => {
            logger.error('error in deleting session')
            reject({
              error: true,
              message: 'unexpected error in deleting session',
              payload: err,
            })
          })
      } catch (error) {
        reject({
          error: true,
          message: 'unexpected error in deleting session',
          payload: error,
        })
      }
    })
  }

  static getSession(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      if (!req.params.sessionSlug) {
        reject({
          error: true,
          message: 'session slug required to return details',
          payload: {},
        })
      }

      SessionModel.findOne({ slug: req.params.sessionSlug })
        .then((event) => {
          if (!event) {
            reject({
              error: true,
              message: 'session not found',
              payload: {},
            })
          }
          resolve({
            error: false,
            message: 'session details found',
            payload: event,
          })
        })
        .catch((err) => {
          logger.error('error getting session data')
          reject({
            error: true,
            message: 'unexpected error fetching session data',
            payload: err,
          })
        })
    })
  }

  static update(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      // check if username to be updated actually exists
      if (!req.body.session || !req.body.session._id) {
        reject({
          error: true,
          message: 'session._id needed to update document',
          payload: {},
        })
      }

      SessionModel.findByIdAndUpdate(req.body.session._id, {
        $set: req.body.session,
      })
        .exec()
        .then(() => {
          resolve({
            error: false,
            message: 'session update successful',
            payload: {},
          })
        })
        .catch((err) => {
          logger.error('error updating session')
          reject({
            error: true,
            message: 'error updating session by id',
            payload: err,
          })
        })
    })
  }
}

export default SessionOperations
