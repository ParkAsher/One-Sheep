const {Customer} = require('../models')
const {Driver} = require('../models')

class LoginRepository {
  constructor(loginModel) {
    this.loginModel = loginModel
  }

  findOneCustomer = async (id) => {
    const customer = await this.loginModel.findOne({where : {id}})

    return customer
  }

  findOneDriver = async (id) => {
    const diver = await this.loginModel.findOne({where : {id}})

    return diver
  }
}

module.exports = LoginRepository