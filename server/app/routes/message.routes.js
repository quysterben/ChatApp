const router = require('express').Router();

const messageController = require('../controllers/message.controller');

router.post('/addMsg', messageController.addMessage);
router.post('/getMsg', messageController.getAllMessage);

module.exports = router;