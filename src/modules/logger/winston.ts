require('dotenv').config()
const winston = require('winston')

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.errors({ stack: true }),
  ),
  //   defaultMeta: { service: 'logging' },
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.simple(),
        winston.format.json(),
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.errors({ stack: true }),
      ),
    }),
    new winston.transports.File({
      filename: 'combined.log',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.simple(),
        winston.format.json(),
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.errors({ stack: true }),
      ),
    }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  winstonLogger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  )
}

export default winstonLogger
