const { body } = require('express-validator')

const signinValidation = [
    body('username').isLength({ min: 3 }).notEmpty().withMessage('Please enter valid data.'),
    body('password').trim().isLength({ min: 8 }).notEmpty(),
];

module.exports = signinValidation;