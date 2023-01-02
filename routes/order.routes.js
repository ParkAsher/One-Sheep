const express = require('express');
const router = express.Router();

// controllers
const OrderController = require('../controllers/order.controller.js');
const orderController = new OrderController();

// 사장페이지 오더 가져오기
router.get('/driver', orderController.getDriverOrder);

router.post('/:driverId', orderController.createOrder);

// 사장페이지 오더 상태변경
router.put('/:orderId/status', orderController.changeStatus);

module.exports = router;
