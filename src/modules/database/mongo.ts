// const mongoClient = require('mongodb').MongoClient
import { MongoClient } from 'mongodb'
import logger from '../logger/winston'

const connectionString = 'mongodb://127.0.0.1:27017/'

var mongodb: any

function connect(callback: any) {
  MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    err ? logger.error('Error connecting to Database') : null

    const db = client.db('attendance')
    mongodb = db
    callback()
  })
}

function get() {
  return mongodb
}

function close() {
  mongodb.close()
}
export { connect, get, close, mongodb as db }
