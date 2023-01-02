const LoginRepository = require('../repositories/login.repository.js')
const {Login} = require('../models/index.js')

class LoginService {
  loginRepository = new LoginRepository(Login)

  findOneCustomer = async (id) => {
    const customer = await this.loginRepository.findOneCustomer(id)

    return {
      customerId : customer.customerId,
      id : customer.id,
      password : customer.password,
      createdAt : customer.createdAt,
      updatedAt : customer.updatedAt
    }
  }

  findOneDriver = async (id) => {
    const driver = await this.loginRepository.findOneDriver(id)

    return {
      driverId : driver.customerId,
      id : driver.id,
      password : driver.password,
      createdAt : driver.createdAt,
      updatedAt : driver.updatedAt
    }
  }
}

module.exports = LoginService