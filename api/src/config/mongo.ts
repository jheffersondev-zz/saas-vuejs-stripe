import mongoose from 'mongoose'
import env from './env'

mongoose.connect(env.databaseUrl === undefined ? '' : env.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongodb connection error:'))
db.once('open', () => {
  console.log('mongodb connection established')
})
