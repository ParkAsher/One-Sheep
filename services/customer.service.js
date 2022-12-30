const CustomerRepository = require('../repositories/customer.repository.js');
const { Customer } = require('../models/index.js');

class CustomerService {
    // Repository
    customerRepository = CustomerRepository(Customer);
}

module.exports = CustomerService;
