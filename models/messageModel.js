
const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    sender: {
        type: Object
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chats'
    },
    content: String,
    images: Array,
    hideBy: String
}, {
    timestamps: true
})


const messageModel = mongoose.model('messages', messageSchema)
module.exports = messageModel;