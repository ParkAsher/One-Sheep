const ReviewsRepository = require('../repositories/reviews.repository.js')

class ReviewsService{
    reviewsRepository = new ReviewsRepository()

    // 특정 캠핑카 리뷰 조회
    getDriverReviews = async (driverId) => {
        try {
            const reviews = await this.reviewsRepository.getDriverReviews(driverId)

            // 해당 ID에 존재하는 사장이 없으면 throw error
            if (reviews.length === 0) {
                const error = new Error ('해당 ID에 존재하는 사장님이 없습니다.')
                error.name = 'ID does not exist'
                error.status = 404
                error.success = false

                throw error
            }

            return reviews
        } catch (error) {
            throw error
        }
    }
}

module.exports = ReviewsService