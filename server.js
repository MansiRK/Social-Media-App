/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
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

const http = require("http").createServer(app)

// Attach http server to socket.io
const io = require("socket.io")(http, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
})

// Create a new connection
io.on("connection", (socket) => {
  console.log(socket)
  console.log("A user connected")
})

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
http.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("Server unable to start due to error: ", error)
  }

  console.log(`Server successfully started at PORT: ${process.env.PORT}`)
})