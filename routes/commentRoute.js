// Import
const express = require("express")

const route = express.Route()
const commentController = require("../controllers/commentController")
const middleware = require("../middleware/middleware")

route.post("/", middleware, commentController.createComment)

// Export
module.exports = route