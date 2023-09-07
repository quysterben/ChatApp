const router = require('express').Router();

const messageController = require('../controllers/message.controller');

router.post('/addMsg', messageController.addMessage);
router.get('/getMsg', messageController.getAllMessage);

module.exports = router;