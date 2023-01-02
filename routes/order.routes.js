const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middlewares.js')

// controllers
const OrderController = require('../controllers/order.controller.js');
const orderController = new OrderController();

// 사장페이지 오더 가져오기
router.get('/driver', orderController.getDriverOrder);

router.post('/:driverId', [authMiddleware, orderController.createOrder]);

module.exports = router;
