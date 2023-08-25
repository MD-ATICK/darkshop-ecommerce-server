const router = require('express').Router()
const categoryControllers = require('../controllers/categoryControllers')
const { isRoleAccessable } = require('../middlewares/roleAuth')
const { isUserAuthorize } = require('../middlewares/userAuthorize')



router.get('/get-category', isUserAuthorize, isRoleAccessable('admin', 'seller'), categoryControllers.get_category)
router.post('/add-category', isUserAuthorize, isRoleAccessable('admin', 'seller'), categoryControllers.add_category)

module.exports = router