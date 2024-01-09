const productModel = require("../models/productModel")
const { responseReturn } = require("../utils/responseReturn")


class productController {
    add_product = async (req, res) => {

        const sellerId = req.user._id
        const { name, category, price, brand, stock, discount, description, images, shopName } = req.body
        const slug = name.split(' ').join('-').trim()

        const createdProduct = await productModel.create({
            sellerId,
            shopName,
            name,
            slug,
            brand: brand?.trim(),
            category: category?.trim(),
            description: description?.trim(),
            stock: parseInt(stock),
            price: parseInt(price),
            discount: parseInt(discount),
            images,
        })

        res.status(201).json({ success: '✅product created', createdProduct })
    }

    get_product = async (req, res) => {
        const { search, category, rating, price } = req.query

        let products = await productModel.find({})
        // 'null' airokom use karom result a null boolean na ase string astece tay.
        if (search && search !== 'null') { products = products.filter(p => p.name.includes(search)) }
        if (category && category !== 'null') {
            let ary = category.split('$')
            let x = []
            for (let i = 0; i < ary.length; i++) {
                const j = products.filter(p => p.category === ary[i])
                x = [...x, ...j]
            }
            products = x;
        }
        if (rating && rating !== 'null') {
            let ary2 = rating.split('$')
            let r = []
            for (let i = 0; i < ary2.length; i++) {
                const j = products.filter(p => parseInt(Math.ceil(p.avgRating)) === parseInt(ary2[i]))
                r = [...r, ...j]
            }
            products = r;
        }
        
        if (price && price !== 'null') {
            products = products.filter(p => {
                const discount = p?.discount || 0
                const dprice = p.price - (p.price * discount / 100)
                if (dprice >= parseInt(price.split('~')[0]) && dprice <= parseInt(price.split('~')[1])) {
                    return p;
                }
            })
        }


        res.status(200).json({ success: 'get product successed✅', prodsLength: products.length, products: products.slice(0, 20) })
    }


    single_get_product = async (req, res) => {
        const { _id } = req.params
        const accessText = req.headers.authorization
        if (!accessText) responseReturn(res, 222, { error: 'you havenot any access.' })
        const product = await productModel.findById(_id).populate('sellerId')

        res.status(200).json({ success: 'single get successed', product })
    }

    edit_product = async (req, res) => {
        const { _id } = req.params
        const editedData = req.body

        const updatedProduct = await productModel.findByIdAndUpdate(_id, editedData, { new: true })

        res.status(201).json({ success: 'edit successed', updatedProduct })
    }

    delete_product = async (req, res) => {
        const { _id } = req.params

        const deletedProduct = await productModel.findByIdAndDelete(_id, { new: true })

        res.status(200).json({ success: 'deleted successed', deletedProduct })
    }

    one_shop_products = async (req, res) => {
        const { _id: shopid } = req.params
        const accessText = req.headers.authorization
        if (!accessText) responseReturn(res, 222, { error: 'you havenot any access.' })

        const shopProds = await productModel.find({ sellerId: shopid })
        responseReturn(res, 200, { success: 'get successed✅', shopProds })
    }

    related_products = async (req, res) => {
        const accessText = req.headers.authorization
        if (!accessText) responseReturn(res, 222, { error: 'you havenot any access.' })

        const { category } = req.query
        const relatedProds = await productModel.find({ category })

        responseReturn(res, 200, { success: 'get relatedprods successed.✅', relatedProds })
    }
}

module.exports = new productController()