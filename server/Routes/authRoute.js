const express = require("express")
const authController = require("../Controllers/authController")
const router = express.Router()
const auth = require("../middleware/auth")


router.post(
  "/register", auth, authController.registerUser
)

router.post(
    "/login", auth, authController.loginUser
)

router.post(
  "/logout", auth, authController.logoutUser
)

router.post(
  "/refresh_token", auth, authController.generateAccessToken
)



module.exports = router