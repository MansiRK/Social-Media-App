// Import
const express = require("express")
const userController = require("../controllers/userController")
const middleware = require("../middleware/middleware")

const router = express.Router()

// Routes
router.get("/search/:username", middleware, userController.searchUser)

router.get("/:id", middleware, userController.getUser)

router.patch("/:id", middleware, userController.updateUser)

router.patch("/follow/:id", middleware, userController.followUser)

router.patch("/unfollow/:id", middleware, userController.unfollowUser)

// Export
module.exports = router