const express = require("express")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.listen(process.env.PORT, (error) =>{
    if(error){
        console.log("Server is unable to start due to", error)
    }

    console.log(`Server successfully started at PORT ${process.env.PORT}`)
} )