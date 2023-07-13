const express = require("express")
const userController = require("../Controllers/userController")
const router = express.Router()

router.get("/search", userController.searchUser)

router.get("/user/:id", userController.getUser)

router.patch("/user", userController.updateUser)

router.patch("/user/:id/follow", userController.followUser)

router.patch("/user/:id/unfollow", userController.unfollowUser)


module.exports = router