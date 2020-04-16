// load express
import express from 'express'

// loading middle-wares
import bodyParser from 'body-parser'

import logger from './modules/logger/winston'

// load body-parser to parse post body

// connect to database
import database from './modules/database/connect'

// binding routes
import userRoutes from './modules/user/routes'
import eventRoutes from './modules/event/routes'
import sessionRoutes from './modules/session/routes'

require('dotenv').config()

// create instance of express
const app = express()

// define port to start server on
const port = process.env.PORT || 3000
database.connect()

// parse valid requests only
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

app.use('/user', userRoutes)
app.use('/event', eventRoutes)
app.use('/session', sessionRoutes)

// start listening on ports
app.listen(port, () => {
  logger.info(`Express server started at port: ${port}`)
})
