// Import
const express = require("express")

const route = express.Router()
const commentController = require("../controllers/commentController")
const middleware = require("../middleware/middleware")

// Route
route.post("/", middleware, commentController.createComment)

route.patch("/:id", middleware, commentController.updateComment)

// Export
module.exports = route