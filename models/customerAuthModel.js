const { default: mongoose } = require("mongoose");


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'customer'
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    method: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
    },
    bio: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    banner: {
        type: String,
        default: ''
    },

}, { timestamps: true })


const customerModel = mongoose.model('customers', customerSchema)
module.exports = customerModel;