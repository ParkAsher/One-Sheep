class LoginRepository {
  constructor(CustomerModel, DriverModel) {
    this.customerModel = CustomerModel
    this.driverModel = DriverModel
  }

  findOneCustomer = async (id) => {
    const customer = await this.customerModel.findOne({where : {id}})

    return customer
  }

  findOneDriver = async (id) => {
    const diver = await this.driverModel.findOne({where : {id}})

    return diver
  }
}

module.exports = LoginRepository