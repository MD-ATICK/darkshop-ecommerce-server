const productControllers = require('../controllers/productControllers');
const { isRoleAccessable } = require('../middlewares/roleAuth');
const { isUserAuthorize } = require('../middlewares/userAuthorize');

const router = require('express').Router()


router.post('/add-product', isUserAuthorize, isRoleAccessable('seller'), productControllers.add_product)
router.get('/get-product', productControllers.get_product)
router.get('/single-get-product/:_id', productControllers.single_get_product)
router.get('/one-shop-products/get/:_id', productControllers.one_shop_products)
router.get('/related-products/get', productControllers.related_products)
router.put('/edit-product/:_id', isUserAuthorize, isRoleAccessable('seller'), productControllers.edit_product)
router.delete('/delete-product/:_id', isUserAuthorize, isRoleAccessable('seller'), productControllers.delete_product)

module.exports = router;