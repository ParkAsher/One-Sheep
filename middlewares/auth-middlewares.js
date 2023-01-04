const jwt = require('jsonwebtoken');
const { Driver } = require('../models');
const { Customer } = require('../models');

module.exports = async (req, res, next) => {
    // 쿠키 들고오기
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) return next();
        const { userId, type } = jwt.verify(accessToken, 'my-secrect-key');
        // console.log(userId, type);

        if (type === 'customer') {
            const customer = await Customer.findOne({
                where: { customerId: userId },
            });
            const point = customer.point;
            const name = customer.name;

            res.locals.user = { userId, type, point, name };
            next();
        } else {
            const driver = await Driver.findOne({
                where: { driverId: userId },
            });
            const name = driver.name;

            res.locals.user = { userId, type, name };
            next();
        }
    } catch (error) {
        console.log(error);
        // 쿠키를 지워야 할 것 같다.
        res.clearCookie('accessToken');
        return res.status(500).json({ message: error });
    }
};
