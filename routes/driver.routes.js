const express = require("express");
const router = express.Router();

const DriverController = require("../controllers/driver.controller");
const driverController = new DriverController();

router.post("/driver/signup", (req, res) => {});

// 기사 (사장) 전체조회하기 / 메인페이지
router.get("/drivers", (req, res) => {
    // 보낼 데이터베이스를 선택 /
    //
    //     res.json({ driver : image })
    // const Drivers = require("")
});
module.exports = router;
