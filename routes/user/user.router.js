const userController = require('../../controllers/user.controller');
const checkRecaptcha = require('../../middleware/recaptcha');

const express = require('express');

const app = express.Router();

app.post('/signup', checkRecaptcha, userController.signup);
app.post('/login', checkRecaptcha, userController.login);
app.post('/forget', checkRecaptcha, userController.forget);

module.exports = app
