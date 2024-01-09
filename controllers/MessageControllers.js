const chatModel = require("../models/chatModel")
const customerModel = require("../models/customerAuthModel")
const messageModel = require("../models/messageModel")
const sellerModel = require("../models/sellerModel")
const { responseReturn } = require("../utils/responseReturn")


class messageController {

    send_message = async (req, res) => {
        const { chatid, content, images } = req.body
        const sender = req.user

        const chat = await chatModel.findById(chatid)
            .populate('seller')
            .populate('customer')
        if (!chat) responseReturn(res, 222, { error: 'chat not founded. L: messageControllers R: send_message' })

        let created_message = await messageModel.create({
            sender,
            chat: chat._id,
            content,
            images
        })
        created_message = await messageModel.findById(created_message._id)
            .populate('chat')

        responseReturn(res, 201, { success: 'messages created.', message: created_message })
    }


    one_chat_get_all_messaegs = async (req, res) => {
        const { chatid } = req.params

        let messages = await messageModel.find({ chat: chatid })
            .populate('chat')

        messages = await sellerModel.populate(messages, {
            path: 'chat.seller',
            select: '-password'
        })
        messages = await customerModel.populate(messages, {
            path: 'chat.customer',
            select: '-password'
        })

        responseReturn(res, 200, { success: 'all messages get successed.', messages })
    }


    one_message_hide = async (req, res) => {
        const { messageid } = req.params
        const userid = req.user._id

        const find = await messageModel.findById(messageid)
        if (!find) return responseReturn(res, 222, { error: 'message not found' })

        const updated_message = await messageModel.findByIdAndUpdate(messageid, { hideBy: userid }, { new: true })

        responseReturn(res, 200, { success: 'message hide successed.', message: updated_message })
    }

}

module.exports = new messageController()