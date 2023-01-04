const LoginService = require('../services/login.service.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {
    loginService = new LoginService();

    findLoginUser = async (req, res, next) => {
        const { id, password, type } = req.body;

        if (!id || !password) return res.status(400).json({ success: false, message: '값을 입력하세요.' });

        try {
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
        } catch (err) {
            console.log(err);
            return res.status(500).json({ errorMessage: err });
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
