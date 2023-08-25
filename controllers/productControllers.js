const productModel = require("../models/productModel")


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
        console.log('add product')
    }

    get_product = async (req, res) => {

        const products = await productModel.find({})

        res.status(200).json({ success: 'get product successed✅', products })
    }

    single_get_product = async (req, res) => {
        const { _id } = req.params

        const product = await productModel.findById(_id)

        res.status(200).json({ success: 'single get successed', product })
    }

    edit_product = async (req, res) => {
        const { _id } = req.params
        const editedData = req.body
        console.log('ed', req.body)

        const updatedProduct = await productModel.findByIdAndUpdate(_id, editedData, { new: true })

        res.status(201).json({ success: 'edit successed', updatedProduct })
    }

    delete_product = async (req, res) => {
        const { _id } = req.params

        const deletedProduct = await productModel.findByIdAndDelete(_id, { new: true })

        res.status(200).json({ success: 'deleted successed', deletedProduct })
    }
}

module.exports = new productController()