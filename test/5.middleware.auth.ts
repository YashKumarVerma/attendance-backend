/* eslint-disable no-unused-expressions */
import fetch from 'node-fetch'
import { expect } from 'chai'
import { describe, it } from 'mocha'

describe(' => Testing /session route', () => {
  const url = 'http://localhost:3000/'

  //   check for headers
  it('should return 400 for making request without Authorization header ', (done) => {
    fetch(`${url}user/login`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        expect(res.status).to.equal(400)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'code', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should return 400 for sending improper Authorization header ', (done) => {
    fetch(`${url}user/login`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json', Authorization: `god wills it` },
    })
      .then((res) => {
        expect(res.status).to.equal(400)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'code', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should return 403 for sending expired / invalid token as Authorization header ', (done) => {
    fetch(`${url}user/login`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer somethingWeThoughWasAJWT` },
    })
      .then((res) => {
        expect(res.status).to.equal(403)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'code', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  //   requesting on protected routes without header should give errors
  it('should return 403 for invalid header on a protected route /event', (done) => {
    fetch(`${url}event/something`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer somethingWeThoughWasAJWT` },
    })
      .then((res) => {
        expect(res.status).to.equal(403)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'code', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should return 403 for invalid header on a protected route /session', (done) => {
    fetch(`${url}session/something`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer somethingWeThoughWasAJWT` },
    })
      .then((res) => {
        expect(res.status).to.equal(403)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'code', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
