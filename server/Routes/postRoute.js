const express = require("express")
const postController = require("../Controllers/postController")
const router = express.Router()
const auth = require("../middleware/auth")

router.post("/create", auth, postController.createPost)

router.get("/get", auth,  postController.getPosts)

router.patch("/update/post/:id", auth, postController.updatePost)

router.patch("/post/:id/like", auth, postController.likePosts)

module.exports = router