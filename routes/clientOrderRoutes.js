const ClientOrderControllers = require('../controllers/ClientOrderControllers')
const { isUserAuthorize } = require('../middlewares/userAuthorize')

const router = require('express').Router()

router.post('/place-order', isUserAuthorize, ClientOrderControllers.place_order)
router.post('/order-paid', isUserAuthorize, ClientOrderControllers.order_paid)
router.get('/customer-orders', isUserAuthorize, ClientOrderControllers.customer_orders)

module.exports = router