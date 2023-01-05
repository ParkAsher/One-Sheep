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

    orderRep = new OrderRepository();
    // 오더 신청
    createOrder = async (customerId, driverId, phone, address, request, usageDateTimeStart, usageTime) => {
        try {
            const status = '접수 대기'
            const createOrderData = await this.orderRep.createOrder(customerId, driverId, phone, address, request, status, usageDateTimeStart, usageTime);

            return {
                customerId: createOrderData.customerId,
                driverId: createOrderData.driverId,
                phone: createOrderData.phone,
                address: createOrderData.address,
                request: createOrderData.request,
                status: createOrderData.status,
                usageDateTimeStart: createOrderData.usageDateTimeStart,
                usageTime: createOrderData.usageTime,
            };
        } catch (error) {
            throw error;
        }
    };

    // 사장페이지 오더 상태변경
    changeStatus = async (orderId, status) => {
        try {
            // 해당 id를 가진 오더가 존재하는지 찾기
            const findOneOrder = await this.orderRepository.findOneOrder(orderId);
            // 존재하지 않는다면?
            if (!findOneOrder) {
                const error = new Error('해당 신청이 존재하지 않습니다.');
                error.name = 'Order Not Found';
                error.status = 400;
                throw error;
            }

            // 오더 상태변경 진행
            return await this.orderRepository.changeStatus(orderId, status);
        } catch (error) {
            throw error;
        }
    };
}

module.exports = OrderService;
