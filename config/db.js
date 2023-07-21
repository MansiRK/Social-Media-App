/* eslint-disable space-infix-ops */
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

module.exports=() => {
// connect mongodb
  mongoose.connect(
    process.env.MONGO_DB,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Database connection established successfully')
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('Database connection failed due to error: ', error)
      process.exit(0)
    })
}