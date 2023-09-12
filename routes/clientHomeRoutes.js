const clientHomeControllers = require('../controllers/clientHomeControllers')


const router = require('express').Router()

router.get('/get-category', clientHomeControllers.get_categoryes)
router.get('/get-products', clientHomeControllers.get_products)

module.exports = router;