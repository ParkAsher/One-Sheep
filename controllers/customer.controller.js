const CustomerService = require('../services/customer.service.js');

// Joi
const { customerRegisterValidateSchema, customerIdValidateSchema, deductionPointValidateSchema } = require('../lib/JoiSchema.js');

class CustomerController {
    // Service
    customerService = new CustomerService();

    // 고객 회원가입
    signUp = async (req, res, next) => {
        try {
            const { id, name, password, passwordCheck } = await customerRegisterValidateSchema.validateAsync(req.body);

            const signUpResult = await this.customerService.createUser(id, name, password);

            return res.status(signUpResult.status).json({ success: signUpResult.success, message: signUpResult.message });
        } catch (error) {
            // Joi Error
            if (error.name === 'ValidationError') {
                error.status = 412;
                error.success = false;
                switch (error.details[0].path[0]) {
                    case 'id':
                        if (error.details[0].type === 'string.empty') {
                            error.message = '아이디를 입력해주세요.';
                            break;
                        }
                        error.message = '아이디의 형식이 일치하지 않습니다.';
                        break;
                    case 'name':
                        if (error.details[0].type === 'string.empty') {
                            error.message = '이름을 입력해주세요.';
                            break;
                        }
                        error.message = '이름의 형식이 일치하지 않습니다.';
                        break;
                    case 'password':
                        if (error.details[0].type === 'string.empty') {
                            error.message = '비밀번호를 입력해주세요.';
                            break;
                        }
                        error.message = '비밀번호 형식 일치하지 않습니다.';
                        break;
                    case 'passwordCheck':
                        if (error.details[0].type === 'string.empty') {
                            error.message = '비밀번호 확인을 입력해주세요.';
                            break;
                        }
                        error.message = '비밀번호가 일치하지 않습니다.';
                        break;
                    default:
                        break;
                }
            }
            return res.status(error.status).json({ success: error.success, message: error.message });
        }
    };

    // 회원 이용내역 조회
    getUserUse = async (req, res, next) => {
        try {
            const customerId = await customerIdValidateSchema.validateAsync(req.params.customerId);
            // 서비스 계층에 구현된 getUserUse 로직을 실행합니다.
            const UserUseResult = await this.customerService.getUserUse(customerId);
            return res.status(200).json({
                success: true,
                message: '이용내역을 불러왔습니다.',
                UserUseResult: UserUseResult,
            });
        } catch (error) {
            // Joi Error
            if (error.name === 'ValidationError') {
                error.status = 412;
                error.success = false;
                if (error.details[0].type === 'number.base') {
                    error.message = '고객 번호 형식이 일치하지 않습니다.';
                }
            }
            return res.status(error.status).json({ success: error.success, message: error.message });
        }
    };

    // 포인트 차감
    pointDeduct = async (req, res, next) => {
        try {
            const requestData = {
                customerId: req.params.customerId,
                deductionPoint: req.body.deductionPoint,
            };
            const { customerId, deductionPoint } = await deductionPointValidateSchema.validateAsync(requestData);

            const pointDeductResult = await this.customerService.pointDeduct(customerId, deductionPoint);

            return res.status(pointDeductResult.status).json({ success: pointDeductResult.success, message: pointDeductResult.message });
        } catch (error) {
            // Joi Error
            if (error.name === 'ValidationError') {
                error.status = 412;
                error.success = false;
                if (error.details[0].path[0] === 'customerId') {
                    error.message = '고객 번호 형식이 일치하지 않습니다.';
                }
                if (error.details[0].path[0] === 'deductionPoint') {
                    error.message = '포인트 형식이 일치하지 않습니다.';
                }
            }
            return res.status(error.status).json({ success: error.success, message: error.message });
        }
    };
}

module.exports = CustomerController;
