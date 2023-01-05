const LoginRepository = require('../repositories/login.repository.js');
const { Customer, Driver } = require('../models/index.js');

class LoginService {
    loginRepository = new LoginRepository(Customer, Driver);

    findOneCustomer = async (id) => {
        const customer = await this.loginRepository.findOneCustomer(id);

        // 만약 존재하지 않는다면?
        if (!customer) {
            const error = new Error('존재하지 않는 고객입니다.');
            error.status = 400;
            error.name = 'Not Found Customer';
            throw error;
        }

        return {
            customerId: customer.customerId,
            id: customer.id,
            password: customer.password,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
        };
    };

    findOneDriver = async (id) => {
        const driver = await this.loginRepository.findOneDriver(id);

        // 만약 존재하지 않는다면?
        if (!driver) {
            const error = new Error('존재하지 않는 사장입니다.');
            error.status = 400;
            error.name = 'Not Found Driver';
            throw error;
        }

        return {
            driverId: driver.driverId,
            id: driver.id,
            password: driver.password,
            createdAt: driver.createdAt,
            updatedAt: driver.updatedAt,
        };
    };
}

module.exports = LoginService;
