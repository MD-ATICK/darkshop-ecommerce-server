const adminModel = require("../models/adminModal")
const { responseReturn } = require("../utils/responseReturn")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateToken } = require("../utils/tokencreate")
const sellerModel = require("../models/sellerModel")
const sellerCustomerModel = require("../models/chat/sellerCustomerModel")


class authControllers {

    // *admin
    admin_login = async (req, res) => {
        const { email, password } = req.body

        try {
            const find = await adminModel.findOne({ email }).select('+password')
            if (!find) return responseReturn(res, 222, { error: 'admin account doesnot exist.' })

            const passwordcheck = await bcrypt.compare(password, find.password)
            if (!passwordcheck) return responseReturn(res, 222, { error: 'password invalid.' })

            const token = await generateToken({ _id: find._id, role: find.role, email: find.email })
            if (!token) return responseReturn(res, 222, { error: 'token not generate.' })
            console.log(token, 'vai')

            responseReturn(res, 201, { user: find, success: 'login successed.', token })

        } catch (error) {
            responseReturn(res, 222, { error: error.message })
        }
    }


    // *seller login
    seller_login = async (req, res) => {
        const { email, password } = req.body

        console.log(req.body)

        try {
            const find = await sellerModel.findOne({ email }).select('+password')
            if (!find) return responseReturn(res, 222, { error: 'seller account doesnot exist.' })

            const passwordcheck = await bcrypt.compare(password, find.password)
            if (!passwordcheck) return responseReturn(res, 222, { error: 'password invalid.' })

            const token = await generateToken({ _id: find._id, role: find.role, email: find.email })
            if (!token) return responseReturn(res, 222, { error: 'token not generate.' })
            console.log(token, 'vai')

            responseReturn(res, 201, { user: find, success: 'seller login successed.', token })

        } catch (error) {
            responseReturn(res, 222, { error: error.message })
        }
    }

    // user authorize
    getUser = async (req, res) => {
        const { _id, role } = req.user

        if (!req.user) return responseReturn(res, 222, { error: 'please Login.' })

        if (role === 'admin') {
            console.log('run admin.')
            const user = await adminModel.findById(_id)
            return responseReturn(res, 200, { user, success: '✅ authorized success.' })
        }
        console.log('run seller.')
        const user = await sellerModel.findById(_id)
        return responseReturn(res, 200, { user, success: '✅ authorized success.' })
        // seller ar kaj
    }
    // admin end

    // *seller
    seller_register = async (req, res) => {
        const { name, email, password, comfirmpassword } = req.body
        try {
            const find = await sellerModel.findOne({ email })
            if (find) return responseReturn(res, 222, { error: 'user already created.' })

            const hashPassword = await bcrypt.hash(password, 10)

            const seller = await sellerModel.create({
                name,
                email,
                password: hashPassword,
                method: 'manualy',
                shopInfo: {}
            })

            await sellerCustomerModel.create({ myId: seller._id })

            const token = await generateToken({ _id: seller._id, role: seller.role, email: seller.email })

            responseReturn(res, 201, { user: seller, success: '✅register successfully.', token })

        } catch (error) {
            responseReturn(res, 222, { error: error.message })
        }

    }


    change_password = async (req, res) => {
        const { email, newpassword, oldpassword, role } = req.body

        if (role === 'seller') {
            const find = await sellerModel.findOne({ email }).select('+password')
            if (!find) return responseReturn(res, 222, { held: 'email', error: 'email is not valid!' })

            console.log(req.body, find)

            const checkPassword = bcrypt.compareSync(oldpassword, find.password)
            if (!checkPassword) return responseReturn(res, 222, { held: 'oldpassword', error: 'password not matched' })

            const hashPassword = await bcrypt.hash(newpassword, 10)

            const updateduser = await sellerModel.findByIdAndUpdate(find._id, { password: hashPassword }, { new: true })

            return res.status(201).json({ success: 'true ✅', user: updateduser })
        }
    }

    seller_updateProfile = async (req, res) => {
        const { name, email, phoneNo, shopName, district, division, subDistrict, bio, avatar, banner } = req.body

        console.log(req.body)
        const find = await sellerModel.findOne({ email })
        if (!find) responseReturn(res, 222, { error: 'user not valid.' })

        const updateSeller = await sellerModel.findByIdAndUpdate(find._id, {
            name,
            phoneNo,
            bio,
            avatar,
            banner,
            shopInfo: {
                shopName,
                district,
                division,
                subDistrict
            }
        }, { new: true })
        console.log(find)
        return responseReturn(res, 201, { success: 'profile updated✅', updateSeller })
    }




}

module.exports = new authControllers()