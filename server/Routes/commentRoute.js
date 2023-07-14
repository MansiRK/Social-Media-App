const express = require("express")
const commentController = require("../Controllers/commentController")
const router = express.Router()

router.post("/add", commentController.createComment)
