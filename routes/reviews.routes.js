const express = require('express');
const router = express.Router();

// controllers
const ReviewsController = require('../controllers/reviews.controller.js');
const reviewsController = new ReviewsController();

// 특정 캠핑카 리뷰
router.get('/:driverId', reviewsController.getDriverReviews)

module.exports = router;


