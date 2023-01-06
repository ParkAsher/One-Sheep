const LoginService = require('../services/login.service.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginValidateSchema } = require('../lib/JoiSchema.js');

class LoginController {
    loginService = new LoginService();

    findLoginUser = async (req, res, next) => {
        try {
            const { id, password, type } = await loginValidateSchema.validateAsync(req.body);

            if (!id || !password) return res.status(400).json({ success: false, message: '값을 입력하세요.' });
            if (type === 'customer') {
                const customer = await this.loginService.findOneCustomer(id);

                const passwordTest = await bcrypt.compare(password, customer.password); // true, false를 반환

                if (!customer || !passwordTest) return res.status(412).json({ success: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' });

                const accessToken = jwt.sign({ userId: customer.customerId, type: 'customer' }, 'my-secrect-key', { expiresIn: '1d' });
                res.cookie('accessToken', accessToken);

                return res.redirect('/customer');
            } else {
                const driver = await this.loginService.findOneDriver(id);

                const passwordTest = await bcrypt.compare(password, driver.password); // true, false를 반환
                console.log(driver);
                if (!driver || !passwordTest) return res.status(412).json({ success: false, message: '아이디 또는 패스워드가 일치하지 않습니다.' });

                const accessToken = jwt.sign({ userId: driver.driverId, type: 'driver' }, 'my-secrect-key', { expiresIn: '1d' });
                res.cookie('accessToken', accessToken);

                return res.redirect('/driver');
            }
        } catch (error) {
            // Joi
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

                    case 'password':
                        if (error.details[0].type === 'string.empty') {
                            error.message = '비밀번호를 입력해주세요';
                            break;
                        }
                        error.message = '비밀번호의 형식이 일치하지 않습니다.';
                        break;

                    case 'type':
                        if (error.details[0].type === 'string.empty') {
                            error.message = '역할을 선택해주세요';
                            break;
                        }
                        error.message = '역할의 형식이 일치하지 않습니다.';
                        break;
                    default:
                        break;
                }
            }
            return res.status(error.status).json({ success: error.success, message: error.message });
        }
    };

    // 로그아웃
    logOut = async (req, res, next) => {
        try {
            res.clearCookie('accessToken');
            return res.status(200).json({ success: true, message: '정상적으로 로그아웃 되었습니다.' });
        } catch (error) {
            return res.status(400).json({ success: false, message: '로그아웃에 실패하였습니다. 관리자에게 문의하여주십시오.' });
        }
    };
}

module.exports = LoginController;
