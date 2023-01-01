const OrderRepository = require('../repositories/order.repository.js');
const { Order, Customer } = require('../models/index.js');
const moment = require('moment');

class OrderService {
    // Repository
    orderRepository = new OrderRepository(Order, Customer);

    // 사장페이지 오더 가져오기
    findDriverOrder = async (driverId) => {
        try {
            const findOrder = await this.orderRepository.findDriverOrder(driverId);

            // 오더가 없더라도 오류는 아니다!
            return findOrder.map((order) => {
                return {
                    orderId: order.orderId,
                    customerId: order.customerId,
                    driverId: order.driverId,
                    phone: order.phone,
                    address: order.address,
                    request: order.request,
                    status: order.status,
                    usageDateTimeStart: moment(order.usageDateTimeStart).format('YYYY-MM-DD HH:mm:ss'),
                    usageTime: order.usageTime,
                    customerName: order.Customer.name,
                };
            });
        } catch (error) {
            throw error;
        }
    };
}

module.exports = OrderService;
