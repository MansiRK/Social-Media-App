const express = require("express")
const userController = require("../Controllers/userController")
const router = express.Router()
const auth = require("../middleware/auth")


router.get("/search", auth, userController.searchUser)

router.get("/user/:_id", auth, userController.getUser)

router.patch("/user", auth, userController.updateUser)

router.patch("/user/:id/follow", auth, userController.followUser)

router.patch("/user/:id/unfollow", auth, userController.unfollowUser)


module.exports = router