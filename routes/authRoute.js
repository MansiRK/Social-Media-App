// Import 
const express = require("express")
const authController = require("../controllers/authController")
const router = express.Router()

// Route
router.post("/register", authController.register)

// Export
module.exports = router