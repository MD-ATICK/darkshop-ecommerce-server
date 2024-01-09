const router = require('express').Router()
const ReviewsControllers = require('../controllers/ReviewsControllers')
const { isUserAuthorize } = require('../middlewares/userAuthorize')


router.get('/review/get/:productid', ReviewsControllers.get_reviews)
router.post('/review/post', isUserAuthorize, ReviewsControllers.post_review)
router.put('/review/put', isUserAuthorize, ReviewsControllers.edit_reviews)
router.delete('/review/delete/:_id', isUserAuthorize, ReviewsControllers.delete_reviews)

module.exports = router