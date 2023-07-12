const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config()

module.exports=() =>{
//connect mongodb
mongoose.connect(
    process.env.MONGO_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() =>{
        
        console.log("Database Connection established successfully")
        
    })
    .catch((error) => {
        console.log("Database Connection failed due to error: ",error)
    process.exit(0)}
    )
}

