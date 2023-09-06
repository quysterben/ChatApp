const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.post('/setAvatar/:id', userController.setAvatar);
router.get('/getAllUsers/:id', userController.getAllUser);

module.exports = router;