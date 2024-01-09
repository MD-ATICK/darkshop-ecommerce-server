const chatModel = require("../models/chatModel")
const { responseReturn } = require("../utils/responseReturn")


class chatController {

    create_chat = async (req, res) => {
        console.log('run code')

        const { oppositeUser } = req.body
        const user = req.user

        const dualUsersArray = [oppositeUser, user]
        console.log('checkingary', dualUsersArray[1])
        const seller = dualUsersArray.find(u => u.role === 'seller')
        const customer = dualUsersArray.find(u => u.role === 'customer')
        console.log({ oppositeUser, user })

        console.log('1')
        const find = await chatModel.findOne({ seller: seller._id })
            .populate('seller')
            .populate('customer')

        if (find) {
            return responseReturn(res, 201, { success: 'old chat finded✅', chat: find })
        }

        console.log('2')
        let created_chat = await chatModel.create({
            seller: seller._id,
            customer: customer._id,
        })

        console.log('3')
        created_chat = await chatModel.findById(created_chat._id)
            .populate('seller')
            .populate('customer')

        responseReturn(res, 201, { success: 'new chat created✅', chat: created_chat })
    }


    get_chat_by_chatid = async (req, res) => {
        const { chatid } = req.params

        const chat = await chatModel.findById(chatid)
            .populate('seller')
            .populate('customer')

        if (!chat) return responseReturn(res, 222, { error: 'chat not founded.⛔' })

        responseReturn(res, 200, { success: 'chat get successed.', chat })
    }

    one_customer_all_chats = async (req, res) => {
        const _id = req.user._id
        const { person } = req.query

        if (person === 'customer') {
            const chats = await chatModel.find({ customer: _id })
                .populate('seller')
                .populate('customer')
            return responseReturn(res, 200, { success: 'one customer chat getted.', chats })
        }

        const chats = await chatModel.find({ seller: _id })
            .populate('seller')
            .populate('customer')
        responseReturn(res, 200, { success: 'one seller chat getted.', chats })
    }
}



module.exports = new chatController()