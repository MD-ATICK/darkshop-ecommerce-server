const mongoose = require('mongoose');



const customerOrderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    products: {
        type: Array,
        required: true
    },
    productsPrice: {
        type: Number,
        required: true
    },
    shippingFee: {
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


const customerOrderModal = mongoose.model('customer_orders', customerOrderSchema)
module.exports = customerOrderModal;