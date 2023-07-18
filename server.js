const express = require('express')
const dotenv = require("dotenv")
const connectToDatabase = require("./config/db")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./socketServer')
const { ExpressPeerServer } = require('peer')
const Routes = require('./routes/index')
const path = require('path')


const app = express();

//middlewares
app.use(express.json());
app.use(cors())
app.use(cookieParser())

dotenv.config()

//connecting database
connectToDatabase()

// Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})

// Create peer server
ExpressPeerServer(http, { path: '/' })


// Routes
app.use('/api/auth', Routes.authRouter)
app.use('/api/user', Routes.userRouter)
app.use('/api/post', Routes.postRouter)
app.use('/api/comment', Routes.commentRouter)
app.use('/api/notify', Routes.notifyRouter)



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