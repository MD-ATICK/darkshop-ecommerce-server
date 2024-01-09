const mongoose = require('mongoose')

// productid - objset id
// sellleid - objset id
// reviewerid - objset id
// rating , images , content
// reply (fetureing)

const reviewSchema = new mongoose.Schema({
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    sellerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers'
    },
    reviewerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    rating: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: Array,
    }
}, { timestamps: true })

const reviewModel = mongoose.model('reviews', reviewSchema)
module.exports = reviewModel