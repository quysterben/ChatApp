const router = require('express').Router();

const userController = require('../controllers/user.controller');

const signupValidation = require('../validations/signup.validation');
const signinValidation = require('../validations/signin.validation')

router.post('/signup', signupValidation, userController.signup);
router.post('/signin', signinValidation, userController.signin);

module.exports = router;