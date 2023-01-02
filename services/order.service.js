const OrderRepository = require('../repositories/order.repository.js')

class OrderService {
    // 오더 신청
    createOrder = async (customerId,
                        driverId,
                        phone,
                        address,
                        request,
                        usageDateTimeStart,
                        usageTime) => {
        const createOrderData = await OrderRepository.createOrder(
            customerId,
            driverId,
            phone,
            address,
            request,
            usageDateTimeStart,
            usageTime
        )

        return {
            customerId: createOrderData.customerId,
            driverId: createOrderData.driverId,
            phone: createOrderData.phone,
            address: createOrderData.address,
            request: createOrderData.request,
            usageDateTimeStart: createOrderData.usageDateTimeStart,
            usageTime: createOrderData.usageTime
        }

    }
}

module.exports = OrderService