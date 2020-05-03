import logger from '../logger/winston'
import { db } from '../database/mongo'
import { createObject, ControllerResponse, clientTokenData, eventDetails } from './interface'
import { sessionDetails } from '../sessions/interface'
import RESPONSES from '../responses/templates'

/**
 * Class to handle all operations related to Events
 */
class EventOperations {
  /**
   * Function to add a new event to the database
   * @param param0 Event object containing specifications of the createObject interface
   * @param client client object containing authorized client's username and email
   * @async
   * @static
   */
  static async createNewEvent({ event }: createObject, client: clientTokenData): Promise<ControllerResponse> {
    try {
      if (!event || !event.slug || !event.eventName || !event.description) {
        console.log(event)
        return RESPONSES.INCOMPLETE_REQUEST()
      }

      event.admin = client.username
      event.participants = []
      event.sessions = []

      const dbOperation = await db.collection('events').insertOne(event)
      logger.info('New Event Created Successfully')
      return RESPONSES.SUCCESS_OPERATION(dbOperation.ops)

      //   catching errors
    } catch (err) {
      logger.error('Error Creating Event')
      return RESPONSES.ERROR(err)
    }
  }

  /**
   * Function to delete an event from the database
   * @param eventSlug slug of the event to delete
   * @param client client object containing authorized client's username and email
   * @static
   * @async
   */
  static async deleteEvent(eventSlug: string, client: clientTokenData): Promise<ControllerResponse> {
    try {
      if (!eventSlug) {
        return RESPONSES.INCOMPLETE_REQUEST()
      }
      const dbOperation = await db.collection('events').deleteOne({ slug: eventSlug, admin: client.username })

      //  if exactly one item is deleted, return success response
      if (dbOperation.result.n == 1) {
        return RESPONSES.SUCCESS_OPERATION()

        // else, return 422 error
      } else {
        return RESPONSES.NOT_FOUND()
      }
    } catch (err) {
      logger.error('Error Deleting Event')
      return RESPONSES.ERROR(err)
    }
  }

  static async getEventDetails(eventSlug: string, client: clientTokenData): Promise<ControllerResponse> {
    try {
      if (!eventSlug) {
        return RESPONSES.INCOMPLETE_REQUEST()
      }

      const eventDetails: eventDetails = await db.collection('events').findOne({ slug: eventSlug, admin: client.username })

      if (!eventDetails) {
        return RESPONSES.NOT_FOUND()
      }

      let sessionDetails: Array<sessionDetails> = []
      for (let i = 0; i < eventDetails.sessions.length; i += 1) {
        const detail = await db.collection('sessions').findOne({ slug: eventDetails.sessions[i], admin: client.username })
        sessionDetails.push(detail)
      }
      eventDetails.sessionDetails = sessionDetails

      logger.info(`Event details for "${eventSlug}" fetched`)
      return RESPONSES.SUCCESS_OPERATION(eventDetails)
    } catch (err) {
      logger.info('Fetching details for event')
      return RESPONSES.ERROR(err)
    }
  }

  static async getAllEventsOfUser(client: clientTokenData): Promise<ControllerResponse> {
    try {
      const cursor = await db.collection('events').find({ admin: client.username })
      const eventsArray: Array<eventDetails> = await cursor.toArray()

      if (!eventsArray) {
        return RESPONSES.SUCCESS_OPERATION([])
      }

      for (let i = 0; i < eventsArray.length; i += 1) {
        let sessionDetails: Array<sessionDetails> = []
        for (let j = 0; j < eventsArray[j].sessions.length; j += 1) {
          const detail = await db.collection('sessions').findOne({ slug: eventsArray[i].sessions[j], admin: client.username })
          if (detail != null) {
            sessionDetails.push(detail)
          }
        }
        eventsArray[i].sessionDetails = sessionDetails
      }
      console.log(eventsArray)

      return RESPONSES.SUCCESS_OPERATION(eventsArray)
    } catch (err) {
      logger.info('Fetching details for event')
      return RESPONSES.ERROR(err)
    }
  }
}

export default EventOperations
