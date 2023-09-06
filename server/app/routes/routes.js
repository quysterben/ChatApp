const express = require('express');

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes')

const serverRoutes = express();

serverRoutes.use('/auth', authRoutes);
serverRoutes.use('/user', userRoutes);

module.exports = serverRoutes;