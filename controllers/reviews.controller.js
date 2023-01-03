const ReviewsService = require("../services/reviews.service.js");

class ReviewsController {
  reviewsService = new ReviewsService();

  // 특정 캠핑카 리뷰 조회
  getDriverReviews = async (req, res) => {
    const { driverId } = req.params;

    try {
      const reviews = await this.reviewsService.getDriverReviews(driverId);

      return res.status(200).send(reviews);
    } catch (error) {
      return res.status(error.status).send(error.message);
    }
  };

  // 리뷰 등록
  postReviews = async (req, res) => {
    try {
      const { driverId } = req.params;
      const { name, stars, content } = req.body;

      // authMiddleware에서 customerId 불러옴
      const { userId, type } = res.locals.user;

      // 고객 회원만 오더 신청 가능
      if (type === "driver") {
        const error = new Error("고객 회원만 서비스 신청이 가능합니다.");
        error.status = 401;
      }

      const customerId = userId;

      const reviews = await reviewsService.postReviews({
        customerId,
        driverId,
        name,
        stars,
        content,
      });

      return res.status(201).json({
        success: true,
        message: "리뷰를 등록했습니다.",
        reviews: reviews,
      });
    } catch (error) {
      return res
        .status(error.status)
        .json({ success: error.success, message: error.message });
    }
  };
}

module.exports = ReviewsController;
