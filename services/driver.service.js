const DriverRepository = require('../repositories/driver.repository.js')
const { Driver } = require('../models/index.js')

class DriverService {
  driverRepository = new DriverRepository(Driver)
}

module.exports = DriverService