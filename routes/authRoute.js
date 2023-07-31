// Import 
const express = require("express")
const authController = require("../controllers/authController")
const router = express.Router()

// Routes
router.post("/register", authController.register)

router.post("/login", authController.login)

// Export
module.exports = router