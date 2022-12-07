const userController = require('../../controllers/user.controller');

const express = require('express');

const app = express.Router();

app.post('/signup', userController.signupUser);
app.post('/login', userController.loginUser);

module.exports = app
