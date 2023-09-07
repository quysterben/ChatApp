const express = require('express');

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes')
const messageRoutes = require('./message.routes')

const serverRoutes = express();

serverRoutes.use('/auth', authRoutes);
serverRoutes.use('/user', userRoutes);
serverRoutes.use('/message', messageRoutes);

module.exports = serverRoutes;