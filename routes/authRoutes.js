const router = require('express').Router()
const authControllers = require('../controllers/authControllers');
const { isUserAuthorize } = require('../middlewares/userAuthorize');

router.post('/admin-login', authControllers.admin_login)
router.get('/get-user', isUserAuthorize, authControllers.getUser)

router.post('/seller-register', authControllers.seller_register)
router.post('/seller-login', authControllers.seller_login)
router.post('/change-password', isUserAuthorize, authControllers.change_password)
router.post('/seller-update-profile', isUserAuthorize, authControllers.seller_updateProfile)
module.exports = router;