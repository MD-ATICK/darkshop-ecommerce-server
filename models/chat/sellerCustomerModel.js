const { default: mongoose } = require("mongoose");

const sellerCustomerSchema = new mongoose.Schema({
    myId: {
        type: mongoose.Types.ObjectId,
        ref: 'sellers'
    },
    myFriends: {
        type: Array,
        default: []
    }
})


const sellerCustomerModel = mongoose.model('seller_customers', sellerCustomerSchema)
module.exports = sellerCustomerModel;