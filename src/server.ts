import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './Shared/logger'

process.on('uncaughtException', error => {
  console.log(error, ' uncaught Exception detected... ')
  // errorLogger.error(error)
  process.exit(1)
})
let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('data connected for the projects')
    server = app.listen(config.port, () => {
      logger.info(`REAL app listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('brooooooo vul hoise', error)
  }
  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection detected, server is closing....')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
