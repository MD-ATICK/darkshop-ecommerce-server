const AdminControllers = require('../controllers/AdminControllers')
const { isRoleAccessable } = require('../middlewares/roleAuth')
const { isUserAuthorize } = require('../middlewares/userAuthorize')


const router = require('express').Router()

router.get('/get-sellers', isUserAuthorize, isRoleAccessable('admin'), AdminControllers.get_sellers)
router.get('/get-sellers-request', isUserAuthorize, isRoleAccessable('admin'), AdminControllers.get_seller_requeset)
router.get('/get-deactive-sellers', isUserAuthorize, isRoleAccessable('admin'), AdminControllers.get_deactive_sellers)
router.get('/single-seller/:_id', isUserAuthorize, isRoleAccessable('admin'), AdminControllers.single_seller)
router.put('/change-status', isUserAuthorize, isRoleAccessable('admin'), AdminControllers.change_status)


module.exports = router