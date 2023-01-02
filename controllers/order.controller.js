const OrderService = require('../services/order.service.js');

// Joi
const { driverIdValidateSchema } = require('../lib/JoiSchema.js');

class OrderController {
    // Service
    orderService = new OrderService();

    // 사장페이지 오더 가져오기
    getDriverOrder = async (req, res, next) => {
        try {
            const driverId = await driverIdValidateSchema.validateAsync(req.query.driverId);

            const getDriverOrderResult = await this.orderService.findDriverOrder(driverId);
            console.log(getDriverOrderResult);

            res.status(200);
            if (getDriverOrderResult.length === 0) {
                return res.json({ success: true, message: '신청 내역이 존재하지 않습니다.' });
            }
            return res.json({ success: true, data: getDriverOrderResult });
        } catch (error) {
            // Joi Error
            if (error.name === 'ValidationError') {
                error.status = 412;
                error.success = false;
                error.message = '데이터 형식이 올바르지 않습니다.';
            }
            console.log(error);
            return res.status(error.status).json({ success: error.success, message: error.message });
        }
    };

    // 오더 신청
    createOrder = async (req, res) => {
        const driverId = req.params;
        const { phone, address, usageDateTimeStart, usageTime } = req.body;

        // authMiddleware에서 userId 가져와야함
        const { customer } = res.locals;
        const customerId = customer.dataValues.customerId;

        try {
            const order = await OrderService.createOrder({
                customerId,
                driverId,
                phone,
                address,
                request,
                usageDateTimeStart,
                usageTime,
            });

            res.status(201).json(order);
        } catch (error) {
            res.status(400).send(error);
        }
    };
}

module.exports = OrderController;
