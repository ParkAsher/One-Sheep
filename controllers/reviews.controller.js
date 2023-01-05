const { driverIdValidateSchema, orderIdValidateSchema, postReviewsValidateSchema } = require('../lib/JoiSchema.js');
const ReviewsService = require('../services/reviews.service.js');

class ReviewsController {
    reviewsService = new ReviewsService();

    // 특정 캠핑카 리뷰 조회
    getDriverReviews = async (req, res) => {
        try {
            const driverId = await driverIdValidateSchema.validateAsync(req.params.driverId);
            const reviews = await this.reviewsService.getDriverReviews(driverId);

            return res.status(200).send(reviews);
        } catch (error) {
            // Joi Error
            if (error.name === 'ValidationError') {
                error.status = 412;
                error.success = false;
                if (error.details[0].type === 'number.base') {
                    error.message = '사장 번호 형식이 일치하지 않습니다.';
                }
            }
            return res.status(error.status).send(error.message);
        }
    };

    // 리뷰 등록
    postReviews = async (req, res) => {
        try {
            const orderId = await orderIdValidateSchema.validateAsync(req.params.orderId);
            const { stars, content } = await postReviewsValidateSchema.validateAsync(req.body);

            // authMiddleware에서 customerId 불러옴
            const { userId, type } = res.locals.user;

            // 고객 회원만 오더 신청 가능
            if (type === 'driver') {
                const error = new Error('고객 회원만 서비스 신청이 가능합니다.');
                error.status = 401;
                throw error;
            }

            const reviews = await this.reviewsService.postReviews({
                orderId,
                stars,
                content,
            });

            return res.status(201).json({
                success: true,
                message: '리뷰를 등록했습니다.',
            });
        } catch (error) {
            console.log(error);
            // Joi Error
            if (error.name === 'ValidationError') {
                error.status = 412;
                error.success = false;
                if (error.details[0].type === 'number.base') {
                    error.message = '신청 번호의 형식이 일치하지 않습니다.';
                }
                if (error.details[0].path[0] === 'stars') {
                    if (error.details[0].type === 'number.base') {
                        error.message = '별점의 형식이 일치하지 않습니다.';
                    }
                    error.message = '별점을 입력해주세요.';
                }
                if (error.details[0].path[0] === 'content') {
                    if (error.details[0].type === 'string.base') {
                        error.message = '내용의 형식이 일치하지 않습니다.';
                    }
                    error.message = '내용을 입력해주세요.';
                }
            }
            return res.status(error.status).json({ success: error.success, message: error.message });
        }
    };
}

module.exports = ReviewsController;
