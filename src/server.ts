import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('data connected for the projects')
    app.listen(config.port, () => {
      console.log(`REAL app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('brooooooo vul hoise', error)
  }
}

bootstrap()
