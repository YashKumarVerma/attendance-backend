require('dotenv').config()

import express from 'express'

import bodyParser from 'body-parser'

import logger from './modules/logger/winston'

import cors from 'cors'

import authMiddleWare from './modules/auth/middleware'

import { connect } from './modules/database/mongo'
import Seed from './modules/database/validator'

// seed collections with validations
connect(async () => {
  logger.info('Database Connencted')
  await Seed.userCollection()
})

// create instance of express
const app = express()

// define port to start server on
const port = process.env.PORT || 3000

// parse valid requests only
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())
app.use(cors())

// loading routes
import userRoutes from './modules/user/routes'

// user interaction allowed without token headers
app.use('/user', userRoutes)

// all routes next to this will require authentication
app.use('/', authMiddleWare)

// start listening on ports
app.listen(port, () => {
  logger.info(`Express server started at port: ${port}`)
})
