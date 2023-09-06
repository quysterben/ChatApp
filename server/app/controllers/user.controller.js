const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const db = require('../models/index');

const authController = {
    signup: async (req, res, next) => {
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
    },
    signin: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = new Error('Validation failed, entered data is incorrect.');
            err.statusCode = 422;
            err.data = errors.array();
            return next(err);
        }

        const username = req.body.username;
        const password = req.body.password;

        try {
            const user = await db.User.findOne({ username: username });
            if (!user) {
                const err = new Error('User not found.');
                err.statusCode = 401;
                throw err;
            }

            const isEqual = await bcryptjs.compare(password, user.password);
            if (!isEqual) {
                const err = new Error('Your password is not incorrect!');
                err.statusCode = 401;
                throw err;
            }

            return res.status(200).json({
                success: true,
                message: 'Login success!',
                user: user,
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            return next(err);
        }
    },
    setAvatar: async (req, res, next) => {
        const userId = req.params.id;
        const avatarImage = req.body.image;

        try {
            const user = await db.User.findByIdAndUpdate(userId, {
                isAvatarImageSet: true,
                avatarImage: avatarImage
            })
            return res.status(200).json({
                success: true,
                message: 'Set avatar success.',
                image: avatarImage
            });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            return next(err);
        }
    }
}

// const createAccessToken = (payload) => {
//     return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
// };

module.exports = authController;