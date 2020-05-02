import { db } from '../database/mongo'
import logger from '../logger/winston'

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
}

export default CollectionSeeder
