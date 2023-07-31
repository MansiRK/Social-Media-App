const express = require("express")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.get("/", (req, res) => {
    res.send("This is from server")
})

app.listen(process.env.PORT, (error) =>{
    if(error){
        console.log("Server unable to start due to error: ", error)
    }

    console.log(`Server successfully started at PORT: ${process.env.PORT}`)
} )