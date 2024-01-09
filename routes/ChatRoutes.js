const ChatControllers = require('../controllers/ChatControllers')
const { isUserAuthorize } = require('../middlewares/userAuthorize')

const router = require('express').Router()


router.post('/chat/create-chat', isUserAuthorize, ChatControllers.create_chat)
router.get('/chat/get-chat-by-chatid/:chatid', isUserAuthorize, ChatControllers.get_chat_by_chatid)
router.get('/chat/one-customer-all-chats', isUserAuthorize, ChatControllers.one_customer_all_chats)


module.exports = router