import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/stripe-subscription-integration', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongodb connection error:'))
db.once('open', function () {
  console.log('mongodb connection established')
})
