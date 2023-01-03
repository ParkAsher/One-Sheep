const OrderService = require('../services/order.service.js');

// Joi
const { driverIdValidateSchema, orderIdValidateSchema, orderStatusValidateSchema, orderRegisterValidateSchema } = require('../lib/JoiSchema.js');

class OrderController {
    // Service
    orderService = new OrderService();

    // 사장페이지 오더 가져오기
    getDriverOrder = async (req, res, next) => {
        try {
            const driverId = await driverIdValidateSchema.validateAsync(req.params.driverId);

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
        const { driverId } = req.params;
        const { phone, address, request, usageDateTimeStart, usageTime } = req.body;

        // authMiddleware에서 customerId 불러옴
        const { userId, type } = res.locals.user;

        // 고객 회원만 오더 신청 가능
        if (type === 'driver') {
            const error = new Error('고객 회원만 서비스 신청이 가능합니다.');
            error.status = 401;
        }

        const customerId = userId;
        const status = '대기 중';

        console.log(customerId,
            driverId,
            phone,
            address,
            request,
            status,
            usageDateTimeStart,
            usageTime,)

        try {
            await orderRegisterValidateSchema.validateAsync(req.body);

            const order = await this.orderService.createOrder(customerId, driverId, phone, address, request, status, usageDateTimeStart, usageTime);

            res.status(201).json(order);
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.log(error.details);
                error.status = 412;
                error.message = error.details[0].message;
                error.type = error.details[0].type;
                error.path = error.details[0].path[0];
                error.success = false;

                // 전화번호 검증
                if (error.path === 'phone') {
                    switch(error.type) {
                        case 'string.pattern.base':
                            error.message = '전화번호는 숫자로만 이루어질 수 있습니다.'
                            break
                        case 'string.max':
                        case 'string.min':
                            error.message = '전화번호는 숫자 10자 이상과 16자 이하로 이루어질 수 있습니다.'
                            break
                        case 'any.required':
                        case 'string.empty':
                            error.message = '전화번호는 필수 항목입니다.'
                            break
                    }
                }

                // 주소 검증
                if (error.path === 'address') {
                    switch(error.type) {
                        case 'any.required':
                        case 'string.empty':
                            error.message = '주소는 필수 항목입니다.'
                            break
                    }
                }

                // 서비스 시작 일시 검증
                if (error.path === 'usageDateTimeStart') {
                    switch(error.type) {
                        case 'any.required':
                        case 'string.empty':
                            error.message = '서비스 시작 일시는 필수 항목입니다.'
                            break
                        case 'date.greater':
                            error.message = '현재 일시 이후만 신청 가능합니다.'
                            break
                    }
                }

                // 서비스 사용 시간 검증
                if (error.path === 'usageTime') {
                    switch(error.type) {
                        case 'any.required':
                        case 'string.empty':
                            error.message = '서비스 사용 시간은 필수 항목입니다.'
                            break
                        case 'number.min':
                        case 'number.max':
                            error.message = '서비스 시간은 1시간 이상과 12이하로 요청 가능합니다.'
                            break
                        case 'number.base':
                            error.message = '서비스 시간은 숫자 입력만 가능합니다.'
                            break
                    }
                }

            }
            console.log(error)
            return res.status(error.status).json({success: error.success, message: error.message});
        }
    };

    // 사장페이지 오더 상태변경
    changeStatus = async (req, res, next) => {
        try {
            const orderId = await orderIdValidateSchema.validateAsync(req.params.orderId);
            const status = await orderStatusValidateSchema.validateAsync(req.body.status);

            const changeStatusResult = await this.orderService.changeStatus(orderId, status);
            return res.status(changeStatusResult.status).json({ success: changeStatusResult.success, message: changeStatusResult.message });
        } catch (error) {
            // Joi Error
            if (error.name === 'ValidationError') {
                error.status = 412;
                error.success = false;
                error.message = '데이터 형식이 올바르지 않습니다.';
            }
            return res.status(error.status).json({ success: error.success, message: error.message });
        }
    };
}

module.exports = OrderController;
