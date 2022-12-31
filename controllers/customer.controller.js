const Joi = require('joi');
const CustomerService = require('../services/customer.service.js');

class CustomerController {
    // Service
    customerService = new CustomerService();

    // 고객 회원가입
    signUp = async (req, res, next) => {
        try {
            const { id, name, password } = req.body;
            const signUpResult = await this.customerService.createUser(id, name, password);

            return res.status(signUpResult.status).json({ success: signUpResult.success, message: signUpResult.message });
        } catch (error) {
            return res.status(error.status).json({ success: false, message: error.message });
        }
    };
}

module.exports = CustomerController;
