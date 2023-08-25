const categoryModel = require("../models/categoryModal")


class category_Controllers {

    add_category = async (req, res) => {
        const { cateName, cateImage } = req.body

        const slug = cateName.split(' ').join('-')

        const category = await categoryModel.create({
            name: cateName,
            image: cateImage,
            slug
        })

        res.status(201).json({ success: '✅ post category successed', category: category })
    }

    get_category = async (req, res) => {

        const categoryes = await categoryModel.find({})

        res.status(200).json({ success: 'get successd', categoryes })
    }
}

module.exports = new category_Controllers()