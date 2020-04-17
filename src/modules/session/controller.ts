import { Request } from 'express'
import logger from '../logger/winston'
import { SessionModel } from './schema'
import { SuccessResponse } from './interface'

class SessionOperations {
  static add(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      console.log(req.body, req.params)
      if (!req.body.session.slug) {
        reject({
          error: true,
          message: 'incomplete data to create session',
        })
      }
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
      console.log(req.body, req.params)
      if (!req.params.sessionSlug || !req.body.session) {
        reject({
          error: true,
          message: 'session slug needed to update document',
          payload: {},
        })
      }

      SessionModel.findOneAndUpdate(
        { slug: req.params.sessionSlug },
        {
          $set: req.body.session,
        },
      )
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

  static addParticipant(req: Request) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      //   check if all valid data provided to add new user to database
      if (!req.body.users || !req.params.sessionSlug) {
        reject({
          error: true,
          message: 'user._id and session-slug needed to add participant',
          payload: {},
        })
      }

      //   now push user to collection
      SessionModel.updateOne(
        { slug: req.params.eventSlug },
        {
          $addToSet: {
            participants: {
              $each: req.body.users,
            },
          },
        },
      )
        .exec()
        .then((resp) => {
          //   console.log(resp)
          resolve({
            error: false,
            message: `user added to session ${req.params.eventSlug}`,
            payload: resp,
          })
        })
        .catch((error) => {
          //   console.log(error)
          reject({
            error: true,
            message: `error adding participant to session ${req.params.eventSlug}`,
            payload: error,
          })
        })
    })
  }
}

export default SessionOperations
