import logger from '../logger/winston'
import { db } from '../database/mongo'
import RESPONSES from '../responses/templates'

import { ControllerResponse } from './interface'

class ExternalOperations {
  static async listAllEvents(): Promise<ControllerResponse> {
    try {
      const cursor = await db.collection('sessions').findMany({})
      if (!cursor) {
        return RESPONSES.NOT_FOUND()
      }

      return RESPONSES.SUCCESS_OPERATION(cursor)

      //   catching errors
    } catch (err) {
      logger.error('Error LoadingP Page In')
      return RESPONSES.ERROR(err)
    }
  }

  static async markAttendance(body: any): Promise<ControllerResponse> {
    try {
      if (!body.registrationNumber || !body.slug || !body.name) {
        return RESPONSES.INCOMPLETE_REQUEST()
      }

      //   get details about session
      const cursor = await db.collection('sessions').findOne({ slug: body.slug })
      if (!cursor) {
        return RESPONSES.NOT_FOUND()
      }

      //   check time
      let islate = false
      const currentTime = new Date().getTime()
      if (cursor.endTime < currentTime) {
        islate = true
      }

      await db.collection('sessions').updateOne(
        { slug: body.slug },
        {
          $push: {
            participants: {
              regNo: body.registrationNumber,
              name: body.name,
              late: islate,
            },
          },
        },
      )

      return RESPONSES.SUCCESS_OPERATION({ collectionDetails: cursor })

      //   catching errors
    } catch (err) {
      return RESPONSES.ERROR(err)
    }
  }
}

export default ExternalOperations
