// Import 
const userController = require("../controllers/userController")
const express = require("express")
const router = express.Router()

// Routes
router.get("/search/:username", userController.searchUser )

router.get("/:id", userController.getUser)

// Export
module.exports = router