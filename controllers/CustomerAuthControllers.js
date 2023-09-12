const customerModel = require("../models/customerAuthModel")
const { responseReturn } = require("../utils/responseReturn")
const bcrypt = require('bcrypt')
const { generateToken } = require("../utils/tokencreate")

class customer_auth_controllers {

    customer_get_me = async (req, res) => {
        console.log('running with me.')

        if (!req.user) return responseReturn(res, 222, { error: 'please Login.' })

        const customer = await customerModel.findById(req.user._id)
        return responseReturn(res, 200, { customer, success: '✅ authorized success.' })
        // seller ar kaj
    }


    customer_register = async (req, res) => {
        const { name, email, password } = req.body
        console.log('running with register.')
        try {
            const find = await customerModel.findOne({ email })
            if (find) return responseReturn(res, 222, { error: 'user already created.' })

            const hashPassword = await bcrypt.hash(password, 10)

            const customer = await customerModel.create({
                name,
                email,
                password: hashPassword,
                method: 'manualy',
            })

            const token = await generateToken({ _id: customer._id, role: customer.role, email: customer.email })

            responseReturn(res, 201, { customer, success: '✅ customer register successfully.', token })

        } catch (error) {
            responseReturn(res, 222, { error: error.message })
        }
    }



    customer_login = async (req, res) => {
        const { email, password } = req.body

        console.log('running with login.')

        try {
            const find = await customerModel.findOne({ email }).select('+password')
            if (!find) return responseReturn(res, 222, { error: 'seller account doesnot exist.' })

            const passwordcheck = await bcrypt.compare(password, find.password)
            if (!passwordcheck) return responseReturn(res, 222, { error: 'password invalid.' })

            const token = await generateToken({ _id: find._id, role: find.role, email: find.email })
            if (!token) return responseReturn(res, 222, { error: 'token not generate.' })
            console.log(token, 'vai')

            responseReturn(res, 201, { customer: find, success: '✅customer login successed.', token })

        } catch (error) {
            responseReturn(res, 222, { error: error.message })
        }
    }

    change_password = async (req, res) => {
        const { oldpass, newpass } = req.body
        const { _id } = req.user

        const user = await customerModel.findById(_id).select('+password')

        const checkPassword = await bcrypt.compare(oldpass, user.password)
        if (!checkPassword) return responseReturn(res, 222, { error: 'password invalid.' })

        if (!user) return responseReturn(res, 222, { error: 'customer id not found.' })

        const hashPassword = await bcrypt.hash(newpass, 10)

        await customerModel.findByIdAndUpdate(_id, { password: hashPassword })
        responseReturn(res, 201, { success: 'change passoword successed.✅' })
    }

}

module.exports = new customer_auth_controllers()