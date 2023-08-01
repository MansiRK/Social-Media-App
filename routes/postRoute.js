// Import
const express = require("express")

const route = express.Router()
const postController = require("../controllers/postController")
const middleware = require("../middleware/middleware")

// Routes
route.post("/", middleware, postController.createPost)

route.get("/", middleware, postController.getAllPosts)

route.get("/:id", middleware, postController.getSinglePost)

route.get("/user_post/:id", middleware, postController.getUserPosts)

route.patch("/update/:id", middleware, postController.updatePost)

route.patch("/like/:id", middleware, postController.likePost)

route.patch("/unlike/:id", middleware, postController.unlikePost)

// Export
module.exports = route