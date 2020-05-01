import { MongoClient, Logger } from 'mongodb'
import logger from '../logger/winston'
import Users from '../user/schema'
// const Users = require('../user/schema')

class MongoBot {
  client: any
  db: any
  Users: any

  constructor() {
    this.client = new MongoClient(
      process.env.DB_CONNECTION_STRING ||
        'mongodb://localhost:27017/attendance',
      { useUnifiedTopology: true },
    )
  }
  async init() {
    await this.client.connect()
    logger.info('Database Connected')

    this.db = this.client.db('attendance')
    this.Users = new Users(this.db)
  }
}

async function DatabaseConnector(handle: any) {
  await handle.init()
}

export default new MongoBot()
export { DatabaseConnector }
