const express = require('express');

const authRoutes = require('./auth.routes');

const serverRoutes = express();

serverRoutes.use('/auth', authRoutes);

module.exports = serverRoutes;