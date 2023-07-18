const router = require('express').Router()
const commentController = require('../controllers/commentController')
const auth = require('../middleware/auth')

router.post('/', auth, commentController.createComment)

router.patch('/:id', auth, commentController.updateComment)

router.patch('/:id/like', auth, commentController.likeComment)

router.patch('/:id/unlike', auth, commentController.unLikeComment)

router.delete('/:id', auth, commentController.deleteComment)



module.exports = router