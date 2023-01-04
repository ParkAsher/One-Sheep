const { Review, Order, Customer } = require('../models/index.js');
const { Op } = require("sequelize");

class ReviewsRepository {
    // 특정 캠핑카 정보 조회
    getDriverReviews = async (driverId) => {
        try {
            const reviews = await Order.findAll({
                where: { driverId },
                attributes: [],
                raw: true,
                include: [
                    {
                        model: Review,
                        attributes: ['stars', 'content', 'createdAt'],
                        where: {
                            content: {[Op.ne]: null}
                        }
                    },
                    {
                        model: Customer,
                        attributes: ['name']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });
            return reviews;
        } catch (error) {
            console.log(error);
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };

    // 리뷰 등록
    createReview = async (reviewFields) => {
        try {
            const review = await Review.create(reviewFields);
            return review;
        } catch (error) {
            error.name = 'Database Error';
            error.message = '리뷰를 작성하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };
}

module.exports = ReviewsRepository;
