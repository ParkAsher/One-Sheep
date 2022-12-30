const express = require('express');
const router = express.Router();

// controllers
const CustomerController = require('../controllers/customer.controller.js');
const customerController = new CustomerController();

// 고객 회원가입
router.post('/customer/signup', customerController.signUp);

module.exports = router;
