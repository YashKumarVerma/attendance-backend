/* eslint-disable no-unused-expressions */
import fetch from 'node-fetch'
import { expect } from 'chai'
import { describe, it } from 'mocha'

describe(' => Testing /session route', () => {
  const url = 'http://localhost:3000/'

  // variables to simulate user session
  const user = {
    first: {
      username: 'yashkumarverma',
      password: '123456',
      token: '',
    },
    second: {
      username: 'hephaestus',
      password: '123456',
      token: '',
    },
  }

  const event = {
    second: {
      eventName: 'Youth Hackathon',
      slug: 'youth-hackathon',
      participants: [],
      sessions: [],
      description: 'something awesome about the hackathon',
    },
    third: {
      eventName: 'Third event',
      slug: 'third-event',
      participants: [],
      session: [],
      description: 'a third event',
    },
  }

  const session = {
    first: {
      parent: event.third.slug,
      participants: [],
      slug: 'session-one',
      sessionName: 'session one',
      endTime: 1588034700000,
      startTime: 1588033800000,
      createdAt: 1588030429633,
      overtimePermission: false,
    },
    second: {
      parent: 'code-2-create-2021',
      participants: [],
      slug: 'session-two',
      sessionName: 'session two',
      endTime: 1588034700000,
      startTime: 1588033800000,
      createdAt: 1588030429633,
      overtimePermission: false,
    },
  }

  //   logging like a user
  it('should successfully login and return a jwt token for first user', (done) => {
    fetch(`${url}user/login`, {
      method: 'post',
      body: JSON.stringify(user.first),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.false
        user.first.token = resp.payload
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should successfully login and return a jwt token for second user', (done) => {
    fetch(`${url}user/login`, {
      method: 'post',
      body: JSON.stringify(user.second),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.false
        user.second.token = resp.payload
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  // void creating sessions with empty object
  it('should not create session with empty data', (done) => {
    fetch(`${url}session/create`, {
      method: 'post',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.first.token}` },
    })
      .then((res) => {
        // incomplete error status code
        expect(res.status).to.equal(422)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  // void creating sessions with partials
  it('should not create session without parent', (done) => {
    fetch(`${url}session/create`, {
      method: 'post',
      body: JSON.stringify({
        session: {
          participants: [],
          slug: 'session-one',
          sessionName: 'session one',
          endTime: 1588034700000,
          startTime: 1588033800000,
          createdAt: 1588030429633,
          overtimePermission: false,
        },
      }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.first.token}` },
    })
      .then((res) => {
        // incomplete error status code
        expect(res.status).to.equal(422)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should not create session without slug', (done) => {
    fetch(`${url}session/create`, {
      method: 'post',
      body: JSON.stringify({
        session: {
          parent: 'code-2-create-2021',
          participants: [],
          sessionName: 'session one',
          endTime: 1588034700000,
          startTime: 1588033800000,
          createdAt: 1588030429633,
          overtimePermission: false,
        },
      }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.first.token}` },
    })
      .then((res) => {
        // incomplete error status code
        expect(res.status).to.equal(422)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should not create session without session name', (done) => {
    fetch(`${url}session/create`, {
      method: 'post',
      body: JSON.stringify({
        session: {
          parent: 'code-2-create-2021',
          participants: [],
          slug: 'session-one',
          endTime: 1588034700000,
          startTime: 1588033800000,
          createdAt: 1588030429633,
          overtimePermission: false,
        },
      }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.first.token}` },
    })
      .then((res) => {
        // incomplete error status code
        expect(res.status).to.equal(422)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should not create session without start time', (done) => {
    fetch(`${url}session/create`, {
      method: 'post',
      body: JSON.stringify({
        session: {
          parent: 'code-2-create-2021',
          participants: [],
          slug: 'session-one',
          sessionName: 'session one',
          endTime: 1588034700000,
          createdAt: 1588030429633,
          overtimePermission: false,
        },
      }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.first.token}` },
    })
      .then((res) => {
        // incomplete error status code
        expect(res.status).to.equal(422)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should not create session without end time', (done) => {
    fetch(`${url}session/create`, {
      method: 'post',
      body: JSON.stringify({
        session: {
          parent: 'code-2-create-2021',
          participants: [],
          slug: 'session-one',
          sessionName: 'session one',
          startTime: 1588033800000,
          createdAt: 1588030429633,
          overtimePermission: false,
        },
      }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.first.token}` },
    })
      .then((res) => {
        // incomplete error status code
        expect(res.status).to.equal(422)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should not create session without overtime permission', (done) => {
    fetch(`${url}session/create`, {
      method: 'post',
      body: JSON.stringify({
        session: {
          parent: 'code-2-create-2021',
          participants: [],
          slug: 'session-one',
          sessionName: 'session one',
          endTime: 1588034700000,
          startTime: 1588033800000,
          createdAt: 1588030429633,
        },
      }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.first.token}` },
    })
      .then((res) => {
        // incomplete error status code
        expect(res.status).to.equal(422)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should create session with proper data', (done) => {
    fetch(`${url}session/create`, {
      method: 'post',
      body: JSON.stringify({ session: session.first }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.first.token}` },
    })
      .then((res) => {
        // incomplete error status code
        expect(res.status).to.equal(200)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.false
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should not create session with same proper data again', (done) => {
    fetch(`${url}session/create`, {
      method: 'post',
      body: JSON.stringify({ session: session.first }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.first.token}` },
    })
      .then((res) => {
        // incomplete error status code
        expect(res.status).to.not.equal(200)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should not create session when parent of another admin', (done) => {
    fetch(`${url}session/create`, {
      method: 'post',
      body: JSON.stringify({ session: session.first }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.second.token}` },
    })
      .then((res) => {
        // incomplete error status code
        expect(res.status).to.not.equal(200)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should not delete session when parent of another admin', (done) => {
    fetch(`${url}session/delete`, {
      method: 'delete',
      body: JSON.stringify({
        session: {
          parent: session.first.parent,
          slug: session.first.slug,
        },
      }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.second.token}` },
    })
      .then((res) => {
        expect(res.status).to.equal(404)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.true
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should delete session when valid data passed', (done) => {
    fetch(`${url}session/delete`, {
      method: 'delete',
      body: JSON.stringify({
        session: {
          parent: session.first.parent,
          slug: session.first.slug,
        },
      }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.first.token}` },
    })
      .then((res) => {
        expect(res.status).to.equal(200)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message')
        expect(resp.error).to.be.false
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
