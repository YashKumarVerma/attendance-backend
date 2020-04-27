import { Request, Response } from 'express'
import logger from '../logger/winston'
import { SessionModel } from './schema'
import { SuccessResponse } from './interface'

class SessionOperations {
  static add(req: Request, res: Response) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      if (!req.body.session.slug) {
        reject({
          error: true,
          message: 'Incomplete data to create session',
        })
      }

      try {
        SessionModel.create({
          slug: req.body.session.slug,
          admin: res.locals.client.username,
          sessionName: req.body.session.sessionName,
          endTime: new Date(req.body.session.endTime).getTime(),
          startTime: new Date(req.body.session.startTime).getTime(),
          createdAt: new Date().getTime(),
          overtimePermission:
            req.body.session.overtimePermission == 'on' ? true : false,
        })
          .then((resp) => {
            logger.info(`Session Created Successfully`)
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
                message: 'Session with same slug exists. Try again',
              })
            }

            if (error.errors) {
              logger.error(`Validation: ${error.message}`)
              reject({
                error: true,
                message: error.message,
                payload: {},
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
          message: 'Unexpected error in creating new session',
          payload: e,
        })
      }
    })
  }

  static delete(req: Request, res: Response) {
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

  static getSession(req: Request, res: Response) {
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

  static update(req: Request, res: Response) {
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

  static addParticipant(req: Request, res: Response) {
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
