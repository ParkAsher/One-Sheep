const express = require("express");
const router = express.Router();

// Controller에 있는것을 가져와서 사용하게 선언
const CustomerController = require('../controllers/customer.controller');
const CustomerController = new CustomerController();

// Controller가 실제로 API 동작을 하게끔 router와 Controller의 메서드를 연결
// 회원 이용내역 조회
router.get('/:customerId', CustomerController.getUseruse);

// 리뷰 등록 (모달)
router.post('/:orderId', CustomerController.createContent);

// 회원 이용내역 조회
// router.get("/:customerId", (req, res) => {});

// 리뷰 등록 (모달)
// router.post("/:orderId/review", (req, res) => {});

module.exports = router;

/*
<프로젝트 구조 개선하기>
1. Layered Architecture Pattern을 적용하기
    - Controller, Service, Repository로 분리된 구조로 구현하기
2. Repository Layer에서 Sequelize Model을 
생성자 주입(Constructor Injection)을 이용해 전달받도록 개선하기
*/

/*
<테스트 코드 작성하기>

1. 단위 테스트(Unit Test)
    - `Controller`, `Service` Layer 내에서 함수 범위로 
    단위 테스트(Unit Test) 구현하기
    - 단위 테스트(Unit Test) 코드 실행 시 데이터베이스에 연결하는 것이 
    아니라 코드 안에서 데이터를 임시로 정의한 후 테스트하기
2. 통합 테스트(Integration Test)
*/





router.get('/', postsController.getPosts);
router.post('/', postsController.createPost);

module.exports = router;"