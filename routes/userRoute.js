// Import 
const userController = require("../controllers/userController")
const express = require("express")
const router = express.Router()

// Routes
router.get("/search", userController.searchUser )

// Export
module.exports = router