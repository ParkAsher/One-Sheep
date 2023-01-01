const express = require('express');
const router = express.Router();

// controllers
const OrderController = require('../controllers/order.controller.js');
const orderController = new OrderController();

// 사장페이지 오더 가져오기
router.get('/driver', orderController.getDriverOrder);

module.exports = router;
