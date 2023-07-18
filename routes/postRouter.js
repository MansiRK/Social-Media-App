const router = require('express').Router()
const postController = require('../controllers/postController')
const auth = require('../middleware/auth')

router.route('/posts')
    .post(auth, postController.createPost)
    .get(auth, postController.getPosts)

router.route('/:id')
    .patch(auth, postController.updatePost)
    .get(auth, postController.getPost)
    .delete(auth, postController.deletePost)

router.patch('/:id/like', auth, postController.likePost)

router.patch('/:id/unlike', auth, postController.unLikePost)

router.get('/user_posts/:id', auth, postController.getPost)

router.get('/post_explore', auth, postController.getPostExplore)

router.patch('/savePost/:id', auth, postController.savePost)

router.patch('/unSavePost/:id', auth, postController.unSavePost)

router.get('/getSavePosts', auth, postController.getSavePosts)


module.exports = router