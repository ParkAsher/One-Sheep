const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middlewares.js");

// controllers
const ReviewsController = require("../controllers/reviews.controller.js");
const reviewsController = new ReviewsController();

// 특정 캠핑카 리뷰
router.get("/:driverId", reviewsController.getDriverReviews);

// 리뷰 등록
router.post("/:driverId", [authMiddleware, reviewsController.postReviews]);

module.exports = router;
