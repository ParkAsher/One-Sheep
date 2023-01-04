const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middlewares.js');

const LoginController = require('../controllers/login.controller.js');
const loginController = new LoginController();

router.post('/login', loginController.findLoginUser);

router.get('/login/check', authMiddleware, async (req, res) => {
    res.json({ user: res.locals.user });
});

router.get('/logout', loginController.logOut);

module.exports = router;
