// Import
const express = require("express")

const route = express.Router()
const postController = require("../controllers/postController")
const middleware = require("../middleware/middleware")

// Routes
route.post("/", middleware, postController.createPost)

route.get("/", middleware, postController.getAllPosts)

route.get("/:id", middleware, postController.getSinglePost)

// Export
module.exports = route