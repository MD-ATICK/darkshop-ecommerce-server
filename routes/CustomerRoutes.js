const router = require('express').Router()
const CustomerAuthControllers = require('../controllers/CustomerAuthControllers')
const { isUserAuthorize } = require('../middlewares/userAuthorize')



router.get('/me', isUserAuthorize, CustomerAuthControllers.customer_get_me)
router.post('/login', CustomerAuthControllers.customer_login)
router.post('/register', CustomerAuthControllers.customer_register)
router.post('/change-password', isUserAuthorize, CustomerAuthControllers.change_password)
router.post('/change-avatar', isUserAuthorize, CustomerAuthControllers.change_avatar)

module.exports = router;