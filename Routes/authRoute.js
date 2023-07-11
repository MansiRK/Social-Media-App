const express = require("express")
const authController = require("../Controllers/authController")
const router = express.Router()

router.post(
  "/register", authController.registerUser
)

router.post(
    "/login", authController.loginUser
)

router.post(
  "/logout", authController.logoutUser
)

router.post(
  "/refresh_token", authController.generateAccessToken
)



module.exports = router