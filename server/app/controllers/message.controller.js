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
        try {
            const { from, to } = req.body;
            const messages = await db.Message.find({
                users: {
                    $all: [from, to],
                }
            }).sort({ updateAt: 1 });
            const projectMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                };
            });
            return res.status(200).json({
                success: true,
                message: 'Get all messages successfully.',
                data: projectMessages,
            })
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            return next(err);
        }
    }
}

module.exports = authController;