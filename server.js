require('dotenv').config()
const express = require('express')
// const mongoose = require('mongose')
const cors =require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/', (req, res) =>{
    res.send("Hello")
})

app.listen(process.env.PORT, (error) =>{
    if (error)
        console.log("Server unable to start: ", error)

    console.log(`Sever is running on port: ${process.env.PORT}` )

})