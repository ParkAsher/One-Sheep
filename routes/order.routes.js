const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middlewares.js");

// controllers
const OrderController = require("../controllers/order.controller.js");
const orderController = new OrderController();

// controllers
// Controller에 있는것을 가져와서 사용하게 선언
const CustomerController = require("../controllers/customer.controller.js");
const customerController = new CustomerController();

// Controller가 실제로 API 동작을 하게끔 router와 Controller의 메서드를 연결
// 회원 이용내역 조회
router.get("/customer/:customerId", customerController.getUserUse);

// 사장페이지 오더 가져오기
router.get("/driver", orderController.getDriverOrder);

router.post("/:driverId", [authMiddleware, orderController.createOrder]);

// 사장페이지 오더 상태변경
router.put("/:orderId/status", orderController.changeStatus);

module.exports = router;
