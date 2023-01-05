const ReviewsRepository = require('../repositories/reviews.repository.js');
const { Review, Order, Customer } = require('../models/index.js');

class ReviewsService {
    reviewsRepository = new ReviewsRepository(Review, Order, Customer);

    // 특정 캠핑카 리뷰 조회
    getDriverReviews = async (driverId) => {
        try {
            const reviews = await this.reviewsRepository.getDriverReviews(driverId);

            // 해당 ID에 존재하는 사장이 없으면 throw error
            if (reviews.length === 0) {
                const error = new Error('해당 ID에 존재하는 사장님이 없습니다.');
                error.name = 'ID does not exist';
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
            //  오더 번호에 해당하는 리뷰가 이미 있으면?
            const existReview = await this.reviewsRepository.findReview(reviewFields.orderId);

            // 만약 존재한다면?
            if (existReview.length !== 0) {
                const error = new Error('이미 리뷰를 등록하였습니다.');
                error.name = 'Already Exist OrderId';
                error.status = 400;
                error.success = false;
                throw error;
            }

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
