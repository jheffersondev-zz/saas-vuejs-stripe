import env from './env'
import mongoose from 'mongoose'

mongoose.connect(env.databaseUrl == undefined ? '' : env.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongodb connection error:'))
db.once('open', function () {
  console.log('mongodb connection established')
})
