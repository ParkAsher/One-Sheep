const {Order} = require('../models')

class OrderRepository {
    createOrder = async (customerId,
                        driverId,
                        phone,
                        address,
                        request,
                        usageDateTimeStart,
                        usageTime) => {
            
        const createOrderData = await Order.create({
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

module.exports = OrderRepository