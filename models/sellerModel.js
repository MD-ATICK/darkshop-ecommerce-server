const { default: mongoose } = require("mongoose");


const registerSellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
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
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: 'seller'
    },
    avatar: {
        type: String,
        default: ''
    },
    banner: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        default: 'inactive'
    },
    method: {
        type: String,
        required: true
    },
    shopInfo: {
        type: Object,
        default: {}
    }
}, { timestamps: true })


const sellerModel = mongoose.model('sellers', registerSellerSchema)
module.exports = sellerModel;