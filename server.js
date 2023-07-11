const express = require("express");
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const connectToDatabase = require("./configs/db")
const Routes = require("./Routes")

//initialize expree app
const app = express()

dotenv.config()

//connecting database
connectToDatabase()

//middleware
app.use(bodyParser.json({
    limit: "30mb", extended: true
}))

app.use(bodyParser.urlencoded({
    limit: "30mb", extended: true
}))


//including other routes
app.use("/auth", Routes.authRouter)

app.listen(process.env.PORT, (error) =>{
    if (error)
        console.log("Server unable to start: ", error)

    console.log(`Sever is running on port: ${process.env.PORT}` )
})