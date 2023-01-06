const { Review, Order, Customer } = require('../models/index.js');
const { Op } = require('sequelize');

class ReviewsRepository {
    constructor(ReviewModel, OrderModel, CustomerModel) {
        this.reviewModel = ReviewModel;
        (this.orderModel = OrderModel), (this.customerModel = CustomerModel);
    }
    // 특정 캠핑카 정보 조회
    getDriverReviews = async (driverId) => {
        try {
            const reviews = await this.orderModel.findAll({
                where: { driverId },
                attributes: [],
                raw: true,
                include: [
                    {
                        model: this.reviewModel,
                        attributes: ['stars', 'content', 'createdAt'],
                        where: {
                            content: { [Op.ne]: null },
                        },
                    },
                    {
                        model: this.customerModel,
                        attributes: ['name'],
                    },
                ],
                order: [['createdAt', 'DESC']],
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
            const review = await this.reviewModel.create(reviewFields);
            return review;
        } catch (error) {
            error.name = 'Database Error';
            error.message = '리뷰를 작성하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };

    // 오더 번호에 해당하는 리뷰가 이미 있는지
    findReview = async (orderId) => {
        try {
            const review = await this.reviewModel.findAll({ where: { orderId } });
            return review;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = ReviewsRepository;
