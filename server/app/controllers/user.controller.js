const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const db = require('../models/index');

const authController = {
    signup: async (req, res, next) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error('Validation failed, entered data is incorrect!');
            err.statusCode = 422;
            err.data = errors.array();
            return next(err);
        }

        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        try {
            const user = await db.User.findOne({ email: email });
            if (user) {
                const err = new Error('User is already exists!');
                err.statusCode = 401;
                throw err;
            }

            const hashedPw = await bcryptjs.hash(password, 12);
            const newUser = {
                username: username,
                email: email,
                password: hashedPw,
            };

            const result = await db.User.create(newUser);
            return res.status(201).json({ success: true, message: 'User created!', result: result });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            return next(err);
        }
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

module.exports = authController;