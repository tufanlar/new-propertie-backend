const express = require('express');
const homeRouter = require('./home/home.router');
const userRouter = require('./user/user.router');

const api = express.Router();

api.use('/propertie', homeRouter);
api.use('/user', userRouter);

module.exports = api
