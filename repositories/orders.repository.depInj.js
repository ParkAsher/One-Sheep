// const {Order} = require('../models')

class OrderRepositoryDepInj {
    // Constructor dependency
    constructor(orderModel) {
        this.orderModel = orderModel
    }

    createOrder = async (customerId,
                        driverId,
                        phone,
                        address,
                        request,
                        usageDateTimeStart,
                        usageTime) => {
            
        const createOrderData = await this.orderModel.create({
            customerId,
            driverId,
            phone,
            address,
            request,
            usageDateTimeStart,
            usageTime
        })

        return createOrderData
    }
}

module.exports = OrderRepositoryDepInj