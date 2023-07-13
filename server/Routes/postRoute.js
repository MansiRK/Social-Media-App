const express = require("express")
const postController = require("../Controllers/postController")
const router = express.Router()

router.post("/create", postController.createPost)

router.get("/get", postController.getPosts)

router.patch("/update/post/:id", postController.updatePost)

router.patch("/post/:id/like", postController.likePosts)

module.exports = router