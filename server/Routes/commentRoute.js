const express = require("express")
const commentController = require("../Controllers/commentController")
const router = express.Router()
const auth = require("../middleware/auth")



router.post("/add", auth, commentController.createComment)

module.exports = router
