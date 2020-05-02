import { db } from '../database/mongo'
import logger from '../logger/winston'

/*
class CollectionSeeder {
  static async userCollection() {
    try {
      await db.createCollection('users', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['username', 'fullName', 'password', 'email'],
            properties: {
              username: {
                bsonType: 'string',
                description: 'username must by unique for every user',
                uniqueItems: true,
              },
              fullName: {
                bsonType: 'string',
                description: 'full name is required',
              },
              password: {
                bsonType: 'string',
                description: 'password is required',
              },
              email: {
                bsonType: 'string',
                description: 'unique email is required ',
                uniqueItems: true,
              },
            },
          },
        },
      })
      await db.createIndex('users', { username: 1 }, { unique: true })
      logger.info('Collection `users` Processed')
    } catch (err) {
      logger.error('Error while processing users schema')
    }
  }

  static async eventCollection() {
    try {
      await db.createCollection('events', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['eventName', 'slug', 'admin', 'sessions', 'participants'],
            properties: {
              eventName: {
                bsonType: ['string'],
                description: 'username must by unique for every user',
                uniqueItems: true,
              },
              slug: {
                bsonType: ['string'],
                description: 'full name is required',
              },
              admin: {
                bsonType: ['string'],
                description: 'password is required',
              },
              session: {
                bsonType: ['array'],
                description: 'unique email is required ',
                uniqueItems: true,
                minItems: 0,
              },
            },
          },
        },
      })
      await db.createIndex('events', { slug: 1 }, { unique: true })
      logger.info('Collection `events` Processed')
    } catch (err) {
      logger.error('Error while processing events schema')
    }
  }

  static async sessionCollection() {
    try {
      await db.createCollection('sessions', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['sessionName', 'slug', 'admin', 'participants', 'startTime', 'endTime', 'createdAt', 'overtimeAllowed'],
            properties: {
              sessionName: {
                bsonType: ['string'],
                description: 'username must by unique for every user',
              },
              slug: {
                bsonType: ['string'],
                description: 'unique session slug is required',
                uniqueItems: true,
              },
              admin: {
                bsonType: ['string'],
                description: 'admin is required',
              },
              participants: {
                bsonType: ['array'],
                description: 'participants in the session ',
                uniqueItems: true,
                minItems: 0,
              },

              startTime: {
                bsonType: ['number'],
                description: 'timestamp of the starting of session',
              },

              endTime: {
                bsonType: ['number'],
                description: 'timestamp of the end of the session',
              },

              createdAt: {
                bsonType: ['number'],
                description: 'timestamp of session creation',
              },

              overtimeAllowed: {
                bsonType: ['boolean'],
                description: 'if overtime entries allowed in session',
              },
            },
          },
        },
      })
      let res = await db.createIndex('sessions', { slug: 1 }, { unique: true })
      logger.info('Collection `sessions` Processed')
    } catch (err) {
      logger.error('Error while processing sessions schema')
    }
  }
}
*/
async function CollectionSeeder() {
  try {
    const users = await db.collection('users').createIndex({ username: 1 }, { unique: true })
    const sessions = await db.collection('sessions').createIndex({ slug: 1 }, { unique: true })
    const events = await db.collection('events').createIndex({ slug: 1 }, { unique: true })
    logger.info('Database Indexes Established')
  } catch (err) {
    logger.error('Error Creating Indexes')
  }
}

export default CollectionSeeder
