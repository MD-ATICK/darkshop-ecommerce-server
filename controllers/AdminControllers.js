const sellerModel = require("../models/sellerModel")
const { responseReturn } = require("../utils/responseReturn")



class admin_Controller {

    get_sellers = async (req, res) => {

        const sellers = await sellerModel.find({ status: 'active' })

        return responseReturn(res, 200, { success: 'active sellers✅', sellers })

    }

    get_seller_requeset = async (req, res) => {

        const sellers = await sellerModel.find({ status: 'pending' })

        return responseReturn(res, 200, { success: 'pending sellers✅', sellers })

    }

    get_deactive_sellers = async (req, res) => {

        const sellers = await sellerModel.find({ status: 'deactive' })

        return responseReturn(res, 200, { success: 'deactive sellers✅', sellers })

    }

    change_status = async (req, res) => {

        const { sellerid, sellerstatus } = req.body
        console.log(req.body)

        const updatedUser = await sellerModel.findByIdAndUpdate(sellerid, { status :  sellerstatus }, { new: true })

        responseReturn(res, 201, { success: 'status updated', updatedUser })
    }

    single_seller = async (req, res) => {
        const { _id } = req.params
        console.log('id vai')

        const findseller = await sellerModel.findById(_id)

        if (!findseller) return responseReturn(res, 222, { error: 'user not existable.' })

        responseReturn(res, 200, { success: 'get single seller.', seller: findseller })
    }
}


module.exports = new admin_Controller()