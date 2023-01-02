const OrderRepository = require('../repositories/order.repository.depInj.js')
const {Orders} = require('../models')

class OrderService {
    orderRepository = new OrderRepository(Orders)

    createOrder = async (customerId,
                        driverId,
                        phone,
                        address,
                        request,
                        usageDateTimeStart,
                        usageTime) => {
        const createOrderData = await this.orderRepository.createOrder(
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