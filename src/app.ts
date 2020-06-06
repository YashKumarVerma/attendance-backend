import express from 'express'

import bodyParser from 'body-parser'

import cors from 'cors'
import logger from './modules/logger/winston'

import authMiddleWare from './modules/auth/middleware'

import { connect } from './modules/database/mongo'
import Seed from './modules/database/validator'

// loading routes
import userRoutes from './modules/user/routes'
import eventRoutes from './modules/events/routes'
import sessionRoutes from './modules/sessions/routes'
import externalRoutes from './modules/externals/routes'

require('dotenv').config()

// seed collections with validations
connect(async () => {
  logger.info('Database Connected')
  await Seed()
})

// create instance of express
const app = express()

// parse valid requests only
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

// app.options('*', cors())
app.use(cors())

// user interaction allowed without token headers
app.use('/externals', externalRoutes)
app.use('/user', userRoutes)
// all routes next to this will require authentication
app.use('/event', authMiddleWare)
app.use('/event', eventRoutes)

app.use('/session', authMiddleWare)
app.use('/session', sessionRoutes)

// start listening on ports
export default app
