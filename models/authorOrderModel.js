const mongoose = require('mongoose');


const authorOrderSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer_orders'
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers'
    },
    orderProducts: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shippingInfo: {
        type: Object,
        required: true
    },
    order_payment_status: {
        type: String,
        default: 'unpaid'
    },
    order_delivery_status: {
        type: String,
        default: 'pending'
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true })


const authorOrderModal = mongoose.model('author_orders', authorOrderSchema)
module.exports = authorOrderModal;