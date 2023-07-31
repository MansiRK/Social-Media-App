// Import 
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// To access variables in env
dotenv.config()

// Connecting database
const connectToDatabase = async(req, res) => {
    mongoose.connect(
    process.env.MONGO_DB, {
    //   useCreateIndex: true,
    //   useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database connection established successfully")
    })
    .catch((error) => {
      console.log("Database connection failed due to error: ", error)
      process.exit(0)
    })
}

// Export
module.exports = connectToDatabase