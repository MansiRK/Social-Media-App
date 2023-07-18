const router = require('express').Router()
const auth = require("../middleware/auth")
const userController = require("../controllers/userController")


router.get('/search', auth, userController.searchUser)

router.get('/:id', auth, userController.getUser)

router.patch('/', auth, userController.updateUser)

router.patch('/:id/follow', auth, userController.followUser)

router.patch('/:id/unfollow', auth, userController.unfollowUser)

router.get('/suggestionsUser', auth, userController.suggestionsUser)



module.exports = router