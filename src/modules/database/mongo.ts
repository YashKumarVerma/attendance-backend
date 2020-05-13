import { MongoClient } from 'mongodb'
import logger from '../logger/winston'

const connectionString: string = process.env.connection_string || 'mongodb://127.0.0.1:27017/'

// eslint-disable-next-line
let mongodb: any

function connect(callback: any) {
  MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      logger.error('Error Connecting to database')
    }

    const db = client.db('attendance')
    mongodb = db
    callback()
  })
}

export { connect, mongodb as db }
