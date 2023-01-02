const DriverService = require('../services/driver.service.js');

// Joi
const { driverRegisterValidateSchema } = require('../lib/JoiSchema.js');

class DriverController {
    // Service
    driverService = new DriverService();

    // 이미지 업로드
    imageUpload = async (req, res, next) => {
        return res.status(200).json({ success: true, filePath: res.req.file.location });
    };

    // 사장 회원가입
    signUp = async (req, res, next) => {
        try {
            const { id, name, password, passwordCheck, image } = await driverRegisterValidateSchema.validateAsync(req.body);
            console.log(req.body);

            const signUpResult = await this.driverService.createUser(id, name, password, image);

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
                        error.message = '비밀번호 형식이 일치하지 않습니다.';
                        break;
                    case 'passwordCheck':
                        if (error.details[0].type === 'string.empty') {
                            error.message = '비밀번호 확인을 입력해주세요.';
                            break;
                        }
                        error.message = '비밀번호가 일치하지 않습니다.';
                        break;
                    case 'image':
                        if (error.details[0].type === 'string.empty') {
                            error.message = '이미지를 선택해주세요.';
                            break;
                        }
                    default:
                        break;
                }
            }
            console.log(error);
            return res.status(error.status).json({ success: error.success, message: error.message });
        }
    };

    // 특정 사장님 캠핑카 정보
    getDriverById = async (req, res) => {
        const { driverId } = req.params;

        try {
            const driver = await this.driverService.getDriverById(driverId);

            return res.status(200).send(driver);
        } catch (error) {
            return res.status(error.status).json({ success: error.success, message: error.message });
        }
    };
}

module.exports = DriverController;