// Import
const express = require("express")
const dotenv = require("dotenv")
const cookieparser = require("cookie-parser")
const connectToDatabase = require("./config/database")
const Route = require("./routes/index")

// To access variables in env
dotenv.config()

// Creating instance of express app
const app = express()

// Middlewares
app.use(express.json())
app.use(cookieparser())

// Including other routes
app.use("/api/auth", Route.authRoute)
app.use("/api/user", Route.userRoute)
app.use("/api/post", Route.postRoute)
app.use("/api/comment", Route.commentRoute)

// Connecting database
connectToDatabase()

// Listening server
app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("Server unable to start due to error: ", error)
  }

  console.log(`Server successfully started at PORT: ${process.env.PORT}`)
})

module.exports = app