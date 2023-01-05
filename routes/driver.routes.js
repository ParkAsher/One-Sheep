const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const {Association} = require("sequelize");

// upload
const setUpload = require("../util/upload.js");

// controllers
const DriverController = require("../controllers/driver.controller.js");
const driverController = new DriverController();

// 이미지업로드
router.post("/drivers/image", setUpload("one-sheep/driverImage"), driverController.imageUpload);
// 사장 회원가입
router.post("/drivers/signup", driverController.signUp);

// 기사 (사장) 전체조회하기 / 메인페이지
router.get("/drivers", driverController.getDriver);

// 특정 사장 정보를 driverId로 조회하기
router.get("/drivers/:driverId", driverController.getDriverById)

module.exports = router;
