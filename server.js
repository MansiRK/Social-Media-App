const express = require('express')
const dotenv = require("dotenv")
const connectToDatabase = require("./config/db")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./socketServer')
const { ExpressPeerServer } = require('peer')
const Routes = require('./routes/index')
const path = require('path')
const { ppid } = require('process')

const app = express();

//middlewares
app.use(express.json());
app.use(cors())
app.use(cookieParser())

dotenv.config()


// Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})

// Create peer server
ExpressPeerServer(http, { path: '/' })


// Routes
app.use('/api', Routes.authRouter)
app.use('/api', Routes.userRouter)
app.use('/api', Routes.postRouter)
app.use('/api', Routes.commentRouter)
app.use('/api', Routes.notifyRouter)


//connecting database
connectToDatabase()


if(process.env.NODE_ENV){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

//running server
http.listen(process.env.PORT, (error) =>{
    if (error)
        console.log("Server unable to start: ", error)

    console.log(`Sever is running on port: ${process.env.PORT}` )
})