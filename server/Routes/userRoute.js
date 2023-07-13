const express = require("express")
const userController = require("../Controllers/userController")
const router = express.Router()

router.get("/search", userController.searchUser)

router.get("/user/:id", userController.getUser)

router.patch("/user", userController.updateUser)

module.exports = router