// Import 
const userController = require("../controllers/userController")
const middleware = require("../middleware")
const express = require("express")
const router = express.Router()

// Routes
router.get("/search/:username", middleware, userController.searchUser )

router.get("/fetch/:id", middleware, userController.getUser)

router.patch("/update/:id", middleware, userController.updateUser)

router.patch("/follow/:id", middleware, userController.followUser)

// Export
module.exports = router