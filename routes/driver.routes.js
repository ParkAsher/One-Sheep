const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const {Association} = require("sequelize");

// upload
const setUpload = require("../util/upload.js");

// controllers
const DriverController = require("../controllers/driver.controller.js");
const driverController = new DriverController();
const {Order, Driver} = require("../models");
const {Op} = require("sequelize");
// const DriverRepository = require("../repositories/driver.repository.js");
// const driverRepository = new DriverRepository();

// 이미지업로드
router.post("/drivers/image", setUpload("one-sheep/driverImage"), driverController.imageUpload);
// 사장 회원가입
router.post("/drivers/signup", driverController.signUp);

// 기사 (사장) 전체조회하기 / 메인페이지
router.get("/drivers", driverController.getDriver);

// } catch (error) {

// }

// const existDriver = await Driver.findAll(); // driver 테이블의 전체 내용을 불러온다

//  table 1 => available 사용완료, ""

//  table 2 => else  접수완료 접수대기 이동중

// const orders = await Order.findAll({where: {status}});

//     Console.log status;

// 1. 드라이버 전체 정보를 가져온다.
// 2. order의 status 값을 확인. 배열의 길이가 0이거나 값이 "완료" 일때 다음 화면으로 리다이렉트
// 3. 이외의 status 값을 가지는 경우 에러메시지 확인.
// 4.

// const status = req.params.status;

// const orders = await Order.findAll({where: {status}});
// // console.log(orders);

// table 1
//     const topTableStatuses = ['', ''];
//     // /api/drivers/

//     // table 2
//     const bottomTableStatuses = ['status1', 'status2'];
//     // /api/drivers/완료

//     // re-render .render
//     ajax.reload <- re-render
//     web socket/ajax.polling 으로 re-render　하는 방법

// or 리렌더 안 할 경우 // 리프레쉬 없이 재클릭시 에러 "이미 이용중인 캠핑카입니다."

/////// *********************************************

// front 테이블 => 위에 주문 안된 driver들 띄우기 available
// 아래에 주문된 driver들 띄우기
//
// driverId로 현 상태가 비워진 사람 찾기 - > 위로 띄우기

// 아래에 주문된 driver들 띄우기
// 위의 driver가 주문을 받으면 그 즉시 아래로 보내기

//

module.exports = router;
