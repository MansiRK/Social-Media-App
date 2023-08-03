// Import
const express = require("express")

const route = express.Router()
const commentController = require("../controllers/commentController")
const middleware = require("../middleware/middleware")

// Route
route.post("/", middleware, commentController.createComment)

// Export
module.exports = route