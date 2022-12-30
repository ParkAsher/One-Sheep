const DriverRepository = require('../repositories/driver.repository.js')

class DriverService {
  driverRepository = new DriverRepository()
}

module.exports = DriverService