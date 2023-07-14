const express = require("express");
const dotenv = require("dotenv")
const connectToDatabase = require("./configs/db")
const Routes = require("./Routes/index")
const cookieParser = require("cookie-parser");


//initialize expree app
const app = express()

dotenv.config()

//connecting database
connectToDatabase()

//middlewares
app.use(express.json())

app.use(cookieParser());

//including other routes

app.use("/auth", Routes.authRouter)

app.use("/users", Routes.userRouter)

app.use("/posts", Routes.postRouter)

app.use("/comments", Routes.commentRouter)




app.listen(process.env.PORT, (error) =>{
    if (error)
        console.log("Server unable to start: ", error)

    console.log(`Sever is running on port: ${process.env.PORT}` )
})