require('dotenv').config()

// load express
import express from 'express'

// load logger
import { logger } from './modules/logger/winston'

// load body-parser to parse post body
import bodyParser from 'body-parser'

// // create instance of express
const app = express()

// // define port to start server on
const port = process.env.PORT || 3000

// // connect to database
import database from './modules/database/connect'
database.connect()

// parse valid requests only
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

// binding routes
import userRoutes from './modules/user/routes'

app.use('/user', userRoutes)

// start listening on ports
app.listen(port, () => {
  logger.info(`Express server started at port: ${port}`)
})
