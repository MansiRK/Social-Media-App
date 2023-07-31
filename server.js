// Import 
const express = require("express")
const dotenv = require("dotenv")
const connectToDatabase = require("./config/database")
const Route = require("./routes/index")

// To access variables in env
dotenv.config()

// Creating instance of express  app
const app = express()

app.get("/", (req, res) => {
  res.send("This is from server")
})

// Including other routes
app.use("api/auth", Route.authRoute)

// Connecting database
connectToDatabase()

// Listening server
app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("Server unable to start due to error: ", error)
  }

  console.log(`Server successfully started at PORT: ${process.env.PORT}`)
})