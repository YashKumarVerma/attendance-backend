/* eslint-disable no-unused-expressions */
import fetch from 'node-fetch'
import { expect } from 'chai'
import { describe, it } from 'mocha'

describe(' => Testing /user route', () => {
  const url = 'http://localhost:3000/user'

  //   testing /create
  it('should throw error creating user with incomplete request', (done) => {
    fetch(`${url}/create`, {
      method: 'post',
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

  //   testing /login
  it('should throw error creating user with incomplete request', (done) => {
    fetch(`${url}/login`, {
      method: 'post',
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

  it('should successfully login and return a jwt token', (done) => {
    fetch(`${url}/login`, {
      method: 'post',
      body: JSON.stringify({
        username: 'yashkumarverma',
        password: '123456',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.false
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should not login ', (done) => {
    fetch(`${url}/login`, {
      method: 'post',
      body: JSON.stringify({
        username: 'yashkumarverma',
        password: 'wront password',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should not login because of incomplete request', (done) => {
    fetch(`${url}/login`, {
      method: 'post',
      body: JSON.stringify({
        username: 'yashkumarverma',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
