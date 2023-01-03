const { Order } = require('../models');

class OrderRepository {
    constructor(OrderModel, CustomerModel) {
        // 의존성 주입
        this.orderModel = OrderModel;
        this.customerModel = CustomerModel;
    }

    // 사장페이지 오더 가져오기
    findDriverOrder = async (driverId) => {
        try {
            // Order DB에 해당하는 사장의 내역이 있는지?
            // 고객 이름을 가져오기 위해 Customer DB와 inn
            const findOrder = await this.orderModel.findAll({
                order: [['createdAt', 'DESC']],
                where: { driverId },
                include: [
                    {
                        model: this.customerModel,
                        attributes: ['name'],
                        required: true,
                    },
                ],
            });

            return findOrder;
        } catch (error) {
            // DB에서 발생한 Error
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };

    // 오더 신청
    createOrder = async (customerId, driverId, phone, address, request, status, usageDateTimeStart, usageTime) => {
        try {
            const createOrderData = await Order.create({
                customerId,
                driverId,
                phone,
                address,
                request,
                status,
                usageDateTimeStart,
                usageTime,
            });
    
            return createOrderData;
        } catch (error) {
            // DB에서 발생한 Error
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };
}

module.exports = OrderRepository;
