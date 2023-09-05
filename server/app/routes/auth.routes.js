const router = require('express').Router();

const userController = require('../controllers/user.controller');

const signupValidation = require('../validations/signup.validation');

router.post('/signup', signupValidation, userController.signup);

module.exports = router;