import { db } from './mongo'
import logger from '../logger/winston'

async function CollectionSeeder() {
  try {
    await db.collection('users').createIndex({ username: 1 }, { unique: true })
    await db.collection('sessions').createIndex({ slug: 1 }, { unique: true })
    await db.collection('events').createIndex({ slug: 1 }, { unique: true })
    logger.info('Database Indexes Established')
  } catch (err) {
    logger.error('Error Creating Indexes')
  }
}

export default CollectionSeeder
