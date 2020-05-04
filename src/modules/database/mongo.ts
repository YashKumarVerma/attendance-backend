import { MongoClient } from 'mongodb'
import logger from '../logger/winston'

const connectionString: string = process.env.CONNECTION_STRING || 'mongodb://127.0.0.1:27017/'

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

function close() {
  mongodb.close()
}

export { connect, close, mongodb as db }
