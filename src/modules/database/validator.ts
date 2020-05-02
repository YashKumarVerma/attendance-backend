import { db } from '../database/mongo'
import logger from '../logger/winston'

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
