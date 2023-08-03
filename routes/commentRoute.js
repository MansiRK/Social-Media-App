// Import
const express = require("express")

const route = express.Router()
const commentController = require("../controllers/commentController")
const middleware = require("../middleware/middleware")

// Route
route.post("/", middleware, commentController.createComment)

route.patch("/:id", middleware, commentController.updateComment)

route.patch("/like/:id", middleware, commentController.likeComment)

route.patch("/unlike/:id", middleware, commentController.unlikeComment)

route.delete("/:id", middleware, commentController.deleteComment)

// Export
module.exports = route