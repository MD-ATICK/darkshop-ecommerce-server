const reviewModel = require("../models/ReviwesModel")
const { responseReturn } = require("../utils/responseReturn")


class reviewsControllers {

    post_review = async (req, res) => {
        const { rating, content, images, sellerid, productid } = req.body
        const reviewerid = req.user._id

        if (!rating || !content) return responseReturn(res, 222, { error: 'some requiesdment unfilled.' })

        const r = await reviewModel.create({
            productid,
            sellerid,
            reviewerid,
            rating,
            content,
            images
        })

        const review = await reviewModel.findById(r._id).populate('reviewerid')

        responseReturn(res, 201, { success: 'post review successed.✅', review })
    }

    get_reviews = async (req, res) => {
        const { productid } = req.params
        const accesstext = req.headers.authorization
        if (!accesstext) return responseReturn(res, 222, { message: 'server is not accesable for you.' })

        const prodReviews = await reviewModel.find({ productid }).populate('reviewerid')
        responseReturn(res, 200, { success: 'get successed.✅', prodReviews })
    }

    edit_reviews = async (req, res) => {
        const { rating, content, images, _id } = req.body

        const editreview = await reviewModel.findByIdAndUpdate(_id, {
            rating,
            content,
            images
        }, { new: true })

        responseReturn(res, 201, { success: 'update successd.✅', editreview })
    }

    delete_reviews = async (req, res) => {
        const { _id } = req.params
        const deletereview = await reviewModel.findByIdAndDelete(_id)
        responseReturn(res, 202, { success: 'deleted successd.✅', deletereview })
    }

}

module.exports = new reviewsControllers()