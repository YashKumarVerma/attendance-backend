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
      console.log(err)
    }
  }
}

export default CollectionSeeder
