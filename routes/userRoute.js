// Import 
const userController = require("../controllers/userController")
const express = require("express")
const router = express.Router()

// Routes
router.get("/search/:username", userController.searchUser )

router.get("/fetch/:id", userController.getUser)

router.patch("/:id"), userController.updateUser

// Export
module.exports = router