// load express
import express from 'express'

// loading middle-wares
import bodyParser from 'body-parser'

import logger from './modules/logger/winston'

import cors from 'cors'

// write middleware to auth requests
import authMiddleWare from './modules/auth/middleware'

// connect to database
import mongo, { DatabaseConnector } from './modules/database/connect'

// binding routes
import userRoutes from './modules/user/routes'
// import eventRoutes from './modules/event/routes'
// import sessionRoutes from './modules/session/routes'

require('dotenv').config()

// create instance of express
const app = express()

// define port to start server on
const port = process.env.PORT || 3000

DatabaseConnector(mongo)

// parse valid requests only
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())
app.use(cors())

app.use('/user', userRoutes)
app.use('/', authMiddleWare)
// app.use('/event', eventRoutes)
// app.use('/session', sessionRoutes)

// start listening on ports
app.listen(port, () => {
  logger.info(`Express server started at port: ${port}`)
})
