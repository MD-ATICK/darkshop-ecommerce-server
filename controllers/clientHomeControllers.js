const categoryModel = require("../models/categoryModal")
const productModel = require("../models/productModel")
const { responseReturn } = require("../utils/responseReturn")



class clientHomeControllers {

    formatProducts = (products) => {

        let productArray = []
        let i = 0

        for (let ns = i; ns < products.length; ns = ns + 4) {
            let tempThreeProductArray = [];
            let j = 0;

            for (let s = i; s < i + 4; s++) {
                if (products[s]) {
                    tempThreeProductArray.push(products[s])
                    j = s + 1
                }
            }

            productArray.push([...tempThreeProductArray]);
            i = j;
        }

        return productArray;
    }



    get_categoryes = async (req, res) => {

        const accesstext = req.headers.authorization
        if (!accesstext) return responseReturn(res, 222, { message: 'server is not accesable for you.' })


        const categoryes = await categoryModel.find({})

        responseReturn(res, 200, { success: 'get successd client✅', categoryes })
    }

    get_products = async (req, res) => {

        // const accesstext = req.headers.authorization
        // if (!accesstext) return responseReturn(res, 222, { message: 'server is not accesable for you.' })

        const allproducts = await productModel.find({})
        const future_products = await productModel.find({}).limit(16).sort({ createdAt: -1 })

        const temp_latest_products = await productModel.find({}).limit(12).sort({ createdAt: -1 })
        const format_latest_products = this.formatProducts(temp_latest_products)

        const temp_topRated_products = await productModel.find({}).limit(12).sort({ avgRating: -1 })
        const format_topRated_products = this.formatProducts(temp_topRated_products)

        const temp_discount_products = await productModel.find({}).limit(12).sort({ discount: -1 })
        const format_discount_products = this.formatProducts(temp_discount_products)


        responseReturn(res, 200, {
            success: 'all products get successed.✅',
            allproducts,
            future_products,
            format_latest_products,
            format_topRated_products,
            format_discount_products
        })

    }

}


module.exports = new clientHomeControllers()