const { body } = require('express-validator')

const signupValidation = [
    body('username').isLength({ min: 3 }).notEmpty().withMessage('Please enter valid data.'),
    body('email').isEmail().withMessage('Please enter a valid email.').normalizeEmail().notEmpty(),
    body('password').trim().isLength({ min: 8 }).notEmpty(),
];

module.exports = signupValidation;