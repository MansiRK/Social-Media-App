const router = require('express').Router()
const auth = require('../middleware/auth')
const notifyController = require('../controllers/notifyController')

router.post('/', auth, notifyController.createNotify)

router.delete('/:id', auth, notifyController.removeNotify)

router.get('/notifies', auth, notifyController.getNotifies)

router.patch('/isReadNotify/:id', auth, notifyController.isReadNotify)

router.delete('/deleteAllNotify', auth, notifyController.deleteAllNotifies)


module.exports = router