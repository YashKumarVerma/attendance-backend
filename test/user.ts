/* eslint-disable no-unused-expressions */
import fetch from 'node-fetch'
import { expect } from 'chai'
import { describe, before, it } from 'mocha'
import serverInstance from '../src/app'

import logger from '../src/modules/logger/winston'
import Seed from '../src/modules/database/validator'
import { db, connect } from '../src/modules/database/mongo'

describe(' => Testing /user route', () => {
  before((done) => {
    serverInstance.listen(3001)
    setTimeout(() => {
      connect(async () => {
        logger.info('Connecting to database to clear old records')
        await Seed()
        await db.collection('users').deleteMany({})
        logger.info('Cleared collection : users')
        await db.collection('events').deleteMany({})
        logger.info('Cleared collection : events')
        await db.collection('sessions').deleteMany({})
        logger.info('Cleared collection : sessions')
        done()
      })
    }, 2000)
  })

  const url = 'http://localhost:3000/user'

  it('should create a new user', (done) => {
    fetch(`${url}/create`, {
      method: 'post',
      body: JSON.stringify({
        user: {
          username: 'yashkumarverma',
          fullName: 'Yash Kumar Verma',
          email: 'yk.verma2000@gmail.com',
          password: '123456',
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((resp) => {
        expect(resp.error).to.be.false
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should create another new user', (done) => {
    fetch(`${url}/create`, {
      method: 'post',
      body: JSON.stringify({
        user: {
          username: 'hephaestus',
          fullName: 'Hephaestus',
          email: 'hephaestus@google.com',
          password: '123456',
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((resp) => {
        expect(resp.error).to.be.false
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should throw error creating user with same username', (done) => {
    fetch(`${url}/create`, {
      method: 'post',
      body: JSON.stringify({
        user: {
          username: 'yashkumarverma',
          fullName: 'Yash Kumar Verma',
          email: 'yk.verma2000@gmail.com',
          password: '123456',
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((resp) => {
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
