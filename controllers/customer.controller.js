const CustomerService = require('../services/customer.service.js');

class CustomerController {
    // Service
    customerService = new CustomerService();

    // 고객 회원가입
    signUp = async (req, res, next) => {};
}

module.exports = CustomerController;
