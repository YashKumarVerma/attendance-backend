import http from 'http'
import app from './app'
import logger from './modules/logger/winston'

const PORT = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`)
})
