const express = require("express")
const postController = require("../Controllers/postController")
const router = express.Router()

router.post("/create", postController.createPost)

router.get("/get", postController.getPosts)

router.post("/update", postController.updatePost)

module.exports = router