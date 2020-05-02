import logger from '../logger/winston'
import { db } from '../database/mongo'
import { createObject, ControllerResponse, clientTokenData } from './interface'
import RESPONSES from '../responses/templates'

/**
 * Class to handle all operations related to Events
 */
class EventOperations {
  /**
   * Static asynchronous method to create a new user
   * @static
   * @async
   * @param req : Request body containing event object
   * @returns ControllerResponse object
   */
  static async createNewEvent({ event }: createObject, client: clientTokenData): Promise<ControllerResponse> {
    try {
      if (!event) {
        return RESPONSES.INCOMPLETE_REQUEST()
      }

      event.admin = client.username
      event.participants = []
      event.sessions = []

      const dbOperation = await db.collection('events').insertOne(event)
      logger.info('New Event Created Successfully')
      return RESPONSES.SUCCESS_OPERATION(null)

      //   catching errors
    } catch (err) {
      logger.error('Error Creating Event')
      return RESPONSES.ERROR(err)
    }
  }
}

export default EventOperations
