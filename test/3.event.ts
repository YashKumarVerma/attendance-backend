/* eslint-disable no-unused-expressions */
import fetch from 'node-fetch'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { toASCII } from 'punycode'

describe(' => Testing /events route', () => {
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
    first: {
      eventName: 'Code 2 Create 2021',
      slug: 'code-2-create-2021',
      participants: [],
      sessions: [],
      description: 'something awesome about the event',
    },
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

  // handle empty request to create server
  it('should not create an event with all entries missing', (done) => {
    fetch(`${url}event/create`, {
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

  // handle partial empty requests
  it('should not create an event even if one entity missing : eventName', (done) => {
    fetch(`${url}event/create`, {
      method: 'post',
      body: JSON.stringify({
        event: {
          slug: 'code-2-create-2021',
          participants: [],
          sessions: [],
          description: 'a very good and friendly hackathon',
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

  it('should not create an event even if one entity missing : slug', (done) => {
    fetch(`${url}event/create`, {
      method: 'post',
      body: JSON.stringify({
        event: {
          eventName: 'Code 2 Create 2021',
          participants: [],
          sessions: [],
          description: 'a very good and friendly hackathon',
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

  it('should not create an event even if one entity missing : description', (done) => {
    fetch(`${url}event/create`, {
      method: 'post',
      body: JSON.stringify({
        event: {
          eventName: 'Code 2 Create 2021',
          slug: 'code-2-create-2021',
          participants: [],
          sessions: [],
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

  it('should successfully create first event if all data provided', (done) => {
    fetch(`${url}event/create`, {
      method: 'post',
      body: JSON.stringify({ event: event.first }),
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

  it('should successfully create second event if all data provided', (done) => {
    fetch(`${url}event/create`, {
      method: 'post',
      body: JSON.stringify({ event: event.second }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.second.token}` },
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

  it('should successfully create third event if all data provided', (done) => {
    fetch(`${url}event/create`, {
      method: 'post',
      body: JSON.stringify({ event: event.third }),
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

  it('should successfully return first event data for first user', (done) => {
    fetch(`${url}event/${event.first.slug}`, {
      method: 'get',
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
        expect(resp.payload.slug).to.equal(event.first.slug)
        expect(resp.payload.eventName).to.equal(event.first.eventName)
        expect(resp.payload.admin).to.equal(user.first.username)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should successfully return second event data for second user', (done) => {
    fetch(`${url}event/${event.second.slug}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.second.token}` },
    })
      .then((res) => {
        // incomplete error status code
        expect(res.status).to.equal(200)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.false
        expect(resp.payload.slug).to.equal(event.second.slug)
        expect(resp.payload.eventName).to.equal(event.second.eventName)
        expect(resp.payload.admin).to.equal(user.second.username)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should not return first event data to second user', (done) => {
    fetch(`${url}event/${event.first.slug}`, {
      method: 'get',
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

  it('should not return second event data to first user', (done) => {
    fetch(`${url}event/${event.second.slug}`, {
      method: 'get',
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

  it('should give details of event one and event three for first user', (done) => {
    fetch(`${url}event/user/all`, {
      method: 'get',
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
        expect(resp.payload.length).to.equal(2)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should give details of event two for second user', (done) => {
    fetch(`${url}event/user/all`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.second.token}` },
    })
      .then((res) => {
        // incomplete error status code
        expect(res.status).to.equal(200)
        return res.json()
      })
      .then((resp) => {
        expect(resp).to.have.all.keys('error', 'message', 'payload')
        expect(resp.error).to.be.false
        expect(resp.payload.length).to.equal(1)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('should not be possible for second user to delete first event', (done) => {
    fetch(`${url}event/${event.first.slug}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.second.token}` },
    })
      .then((res) => {
        // incomplete error status code
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

  it('should be possible for first user to delete first event', (done) => {
    fetch(`${url}event/${event.first.slug}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.first.token}` },
    })
      .then((res) => {
        // incomplete error status code
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
