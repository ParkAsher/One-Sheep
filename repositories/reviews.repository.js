const {Review, Customer} = require('../models/index.js')

class ReviewsRepository {
    // 특정 캠핑카 정보 조회
    getDriverReviews = async (driverId) => {
        try {
            const reviews = await Review.findAll({
                where: {driverId},
                attributes: ['stars', 'content', 'createdAt'],
                raw: true,
                include: [
                    {
                        model: Customer,
                        attributes: ['name']
                    }
                ]
            })
            return reviews

        } catch (error) {
            console.log(error)
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    }
}

module.exports = ReviewsRepository