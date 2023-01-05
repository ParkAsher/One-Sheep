const express = require('express');
const router = express.Router();

// controllers
const CustomerController = require('../controllers/customer.controller.js');
const customerController = new CustomerController();

// 고객 회원가입
router.post('/customers/signup', customerController.signUp);

// 고객 포인트 차감
router.put('/customers/:customerId/points', customerController.pointDeduct);

module.exports = router;
