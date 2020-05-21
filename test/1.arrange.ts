/* eslint-disable no-unused-expressions */
import { describe, before, it } from 'mocha'
import serverInstance from '../src/app'

import logger from '../src/modules/logger/winston'
import Seed from '../src/modules/database/validator'
import { db, connect } from '../src/modules/database/mongo'

describe(' => Testing / route', () => {
  before((done) => {
    try {
      serverInstance.listen(3000)
      setTimeout(() => {
        connect(async () => {
          logger.info('Connecting to database to clear old records')
          Seed()
          db.collection('users').deleteMany({})
          logger.info('Cleared collection : users')
          db.collection('events').deleteMany({})
          logger.info('Cleared collection : events')
          db.collection('sessions').deleteMany({})
          logger.info('Cleared collection : sessions')
          done()
        })
      }, 3000)
    } catch (error) {
      done(error)
    }
  })

  //   testing connection
  it('should just pass', (done) => {
    done()
  })
})
