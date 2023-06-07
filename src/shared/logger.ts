import { createLogger, format, transports } from 'winston'
import path from 'path'
import process from 'process'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, label, printf, prettyPrint } = format

// custom formate
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)

  return `Date: ${date}  [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',

  defaultMeta: { service: 'auth-service' },
  transports: [
    // new transports.File({
    //   filename: path.join(process.cwd(), 'logs', 'winston',"success", '%DATE%.log'),
    // }),
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        '%DATE%-phu-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
  format: combine(
    label({ label: 'info' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'error!' }), timestamp(), myFormat),

  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'error',
        '%DATE%-phu-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new transports.Console(),
  ],
})
export { logger, errorLogger }
