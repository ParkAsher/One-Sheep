const ReviewsRepository = require("../repositories/reviews.repository.js");

class ReviewsService {
  reviewsRepository = new ReviewsRepository();

  // 특정 캠핑카 리뷰 조회
  getDriverReviews = async (driverId) => {
    try {
      const reviews = await this.reviewsRepository.getDriverReviews(driverId);

      // 해당 ID에 존재하는 사장이 없으면 throw error
      if (reviews.length === 0) {
        const error = new Error("해당 ID에 존재하는 사장님이 없습니다.");
        error.name = "ID does not exist";
        error.status = 404;
        error.success = false;

        throw error;
      }

      return reviews;
    } catch (error) {
      throw error;
    }
  };

  // 리뷰 등록
  postReviews = async (reviewFields) => {
    try {
      const review = await this.reviewsRepository.createReview(reviewFields);
      return review;
    } catch (error) {
      throw error;
    }
  };
}

// 리뷰를 등록하는 과정에서는 필요한 인자들이 프론트에서 다 가져와야됨.
// 어소시에이션
// 프론트 클라이언트에서 보내주는 값으로 리뷰가 등록이 됨.

module.exports = ReviewsService;
