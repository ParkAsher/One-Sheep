const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middlewares.js')

// controllers
Controller에 있는것을 가져와서 사용하게 선언
const CustomerController = require("../controllers/customer.controller.js");
const customerController = new CustOmerController();

// Controller가 실제로 API 동작을 하게끔 router와 Controller의 메서드를 연결
// 회원 이용내역 조회
router.get("/:customerId", CustomerController.getUserUse);

/*
<프로젝트 구조 개선하기>
1. Layered Architecture Pattern을 적용하기
    - Controller, Service, Repository로 분리된 구조로 구현하기
2. Repository Layer에서 Sequelize Model을 
생성자 주입(Constructor Injection)을 이용해 전달받도록 개선하기
*/

/*
<테스트 코드 작성하기>

// 사장페이지 오더 가져오기
router.get('/driver', orderController.getDriverOrder);

router.post('/:driverId', [authMiddleware, orderController.createOrder]);

// 사장페이지 오더 상태변경
router.put('/:orderId/status', orderController.changeStatus);

module.exports = router;
