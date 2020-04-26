import { Request, Response } from 'express'
import { SuccessResponse } from './interface'
import { EventModel } from './schema'
import logger from '../logger/winston'

class EventOperations {
  static add(req: Request, res: Response) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      if (!req.body.event) {
        reject({
          error: true,
          message: 'object required to create event',
        })
      }
      try {
        EventModel.create(req.body.event)
          .then((resp) => {
            console.log(resp)
            resolve({
              error: false,
              message: 'Event created successfully',
              payload: resp,
            })
          })
          .catch((error: any) => {
            if (error.errmsg) {
              logger.error(`DB : ${error.errmsg}`)
              reject({
                error: true,
                payload: error,
                message: error.errmsg,
              })
            }

            if (error.errors) {
              logger.error(`Validation: ${error.message}`)
              reject({
                error: true,
                message: 'Validation Error',
                payload: error.message,
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
          message: 'unexpected error in creating new event',
          payload: e,
        })
      }
    })
  }

  static delete(req: Request, res: Response) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      if (!req.params.eventSlug) {
        reject({
          error: true,
          message: 'event slug required to delete event',
          payload: {},
        })
      }

      try {
        EventModel.deleteOne({ slug: req.params.eventSlug })
          .then((resp) => {
            if (resp.deletedCount === 1) {
              resolve({
                error: false,
                message: 'event deletion successful',
                payload: {},
              })
            }
            reject({
              error: true,
              message: 'event not found',
              payload: {},
            })
          })
          .catch((err) => {
            logger.error('error in deleting event')
            reject({
              error: true,
              message: 'unexpected error in deleting event',
              payload: err,
            })
          })
      } catch (error) {
        reject({
          error: true,
          message: 'unexpected error in deleting event',
          payload: error,
        })
      }
    })
  }

  static getEvent(req: Request, res: Response) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      if (!req.params.eventSlug) {
        reject({
          error: true,
          message: 'event slug required to return details',
          payload: {},
        })
      }

      EventModel.findOne({ slug: req.params.eventSlug })
        .then((event) => {
          if (!event) {
            reject({
              error: true,
              message: 'event not found',
              payload: {},
            })
          }
          resolve({
            error: false,
            message: 'event details found',
            payload: event,
          })
        })
        .catch((err) => {
          logger.error('error getting event data')
          reject({
            error: true,
            message: 'unexpected error fetching event data',
            payload: err,
          })
        })
    })
  }

  static update(req: Request, res: Response) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      // check if username to be updated actually exists
      if (!req.body.event || !req.params.eventSlug) {
        reject({
          error: true,
          message: 'eventslug as slug needed to update document',
          payload: {},
        })
      }

      EventModel.findOneAndUpdate(
        { slug: req.params.eventSlug },
        {
          $set: {
            eventName: req.body.event.eventName,
            picture: req.body.event.picture,
            description: req.body.event.description,
          },
        },
      )
        .exec()
        .then((resp) => {
          resolve({
            error: false,
            message: 'event update successful',
            payload: resp,
          })
        })
        .catch((err) => {
          logger.error('error updating event')
          reject({
            error: true,
            message: 'error updating event by id',
            payload: err,
          })
        })
    })
  }

  static addParticipant(req: Request, res: Response) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      //   check if all valid data provided to add new user to database
      if (!req.body.users || !req.params.eventSlug) {
        reject({
          error: true,
          message: 'user._id and event-slug needed to add participant',
          payload: {},
        })
      }

      //   now push user to collection
      EventModel.updateOne(
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
            message: `user added to event ${req.params.eventSlug}`,
            payload: resp,
          })
        })
        .catch((error) => {
          //   console.log(error)
          reject({
            error: true,
            message: `error adding participant to event ${req.params.eventSlug}`,
            payload: error,
          })
        })
    })
  }

  static addSession(req: Request, res: Response) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      //   check if all valid data provided to add new session to database
      if (!req.body.sessions || !req.params.eventSlug) {
        reject({
          error: true,
          message: 'session._id and event-slug needed to add session',
          payload: {},
        })
      }

      //   now push user to collection
      EventModel.updateOne(
        { slug: req.params.eventSlug },
        {
          $addToSet: {
            sessions: {
              $each: req.body.sessions,
            },
          },
        },
      )
        .exec()
        .then((resp) => {
          //   console.log(resp)
          resolve({
            error: false,
            message: `session(s) added to event ${req.params.eventSlug}`,
            payload: resp,
          })
        })
        .catch((error) => {
          //   console.log(error)
          reject({
            error: true,
            message: `error adding session(s) to event ${req.params.eventSlug}`,
            payload: error,
          })
        })
    })
  }

  static listAllUserEvents(req: Request, res: Response) {
    return new Promise<SuccessResponse>((resolve, reject) => {
      //   get username from auth token
      const { username } = res.locals.client

      EventModel.find({ admin: username })
        .then((event) => {
          if (!event) {
            reject({
              error: true,
              message: 'No Event found',
              payload: {},
            })
          }
          resolve({
            error: false,
            message: 'Event details found',
            payload: event,
          })
        })
        .catch((err) => {
          logger.error('Error getting event data')
          reject({
            error: true,
            message: 'Unexpected error fetching event data',
            payload: err,
          })
        })
    })
  }
}

export default EventOperations
