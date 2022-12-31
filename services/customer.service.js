const CustomerRepository = require('../repositories/customer.repository.js');
const { Customer } = require('../models/index.js');

class CustomerService {
    // Repository
    customerRepository = new CustomerRepository(Customer);

    createUser = async (id, name, password) => {
        try {
            // 해당 id를 가진 유저가 이미 존재하는지
            const existUser = await this.customerRepository.isUserExist(id);
            // 존재한다면?
            if (existUser.length !== 0) {
                const error = new Error('이미 사용중인 아이디입니다.');
                error.name = 'Already User Existed';
                error.status = 400;
                throw error;
            }

            // 회원가입 진행
            return await this.customerRepository.createUser(id, name, password);
        } catch (error) {
            throw error;
        }
    };
}

module.exports = CustomerService;
