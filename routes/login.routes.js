const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/login.controller.js');
const loginController = new LoginController();

router.post('/login', loginController.findLoginUser);

router.get('/logout', loginController.logOut);

module.exports = router;
