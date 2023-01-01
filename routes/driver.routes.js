const express = require("express");
const router = express.Router();

// 이미지업로드
router.post("/drivers/image", setUpload("one-sheep/driverImage"), driverController.imageUpload);
// 사장 회원가입
router.post("/drivers/signup", driverController.signUp);

// 기사 (사장) 전체조회하기 / 메인페이지
router.get("/drivers", (req, res) => {
    // 보낼 데이터베이스를 선택 /
    //
    //     res.json({ driver : image })
});
module.exports = router;
