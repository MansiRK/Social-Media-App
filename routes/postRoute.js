// Import
const express = require("express")
const route = express.Router()
const postController = require("../controllers/postController")
const middleware = require("../middleware/middleware")

//Routes
route.post("/", middleware, postController.createPost)

// Export
module.exports = route