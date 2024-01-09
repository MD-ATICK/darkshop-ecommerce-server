
const mongoose = require('mongoose')


const chatSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages'
    },
    chatBlock: {
        type: Boolean,
        default: false
    },
    chatBlockBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers'
    }
}, {
    timestamps: true
})


const chatModel = mongoose.model('chats', chatSchema)
module.exports = chatModel;