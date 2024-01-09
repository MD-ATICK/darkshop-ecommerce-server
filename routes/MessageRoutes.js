const MessageControllers = require('../controllers/MessageControllers');
const { isUserAuthorize } = require('../middlewares/userAuthorize');

const router = require('express').Router()


router.post('/message/send-message', isUserAuthorize, MessageControllers.send_message)
router.get('/message/one-chat-all-messages/:chatid', isUserAuthorize, MessageControllers.one_chat_get_all_messaegs)
router.get('/message/one-message-hide/:messageid', isUserAuthorize, MessageControllers.one_message_hide)

module.exports = router;