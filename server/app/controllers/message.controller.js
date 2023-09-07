const db = require('../models/index');

const authController = {
    addMessage: async (req, res, next) => {
        try {
            const { from, to, message } = req.body;
            const data = await db.Message.create({
                message: { text: message },
                users: [from, to],
                sender: from,
            })
            return res.status(200).json({
                success: true,
                message: 'Message added successfully.',
                data: data,
            })
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            return next(err);
        }
    },
    getAllMessage: async (req, res, next) => {

    }
}

module.exports = authController;