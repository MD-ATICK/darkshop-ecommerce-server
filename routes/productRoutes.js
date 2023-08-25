const productControllers = require('../controllers/productControllers');
const { isRoleAccessable } = require('../middlewares/roleAuth');
const { isUserAuthorize } = require('../middlewares/userAuthorize');

const router = require('express').Router()


router.post('/add-product', isUserAuthorize, isRoleAccessable('seller'), productControllers.add_product)
router.get('/get-product', isUserAuthorize, isRoleAccessable('seller'), productControllers.get_product)
router.get('/single-get-product/:_id', isUserAuthorize, isRoleAccessable('seller'), productControllers.single_get_product)
router.put('/edit-product/:_id', isUserAuthorize, isRoleAccessable('seller'), productControllers.edit_product)
router.delete('/delete-product/:_id', isUserAuthorize, isRoleAccessable('seller'), productControllers.delete_product)

module.exports = router;