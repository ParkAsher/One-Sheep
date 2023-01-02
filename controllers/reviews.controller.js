const ReviewsService = require('../services/reviews.service.js')

class ReviewsController {
    reviewsService = new ReviewsService()

    // 특정 캠핑카 리뷰 조회
    getDriverReviews = async (req,res) => {
        const {driverId} = req.params

        try{
            const reviews = await this.reviewsService.getDriverReviews(driverId)

            return res.status(200).send(reviews)
        } catch (error){
            return res.status(error.status).send(error.message)
        }
    }
}

module.exports = ReviewsController
