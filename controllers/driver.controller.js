const DriverService = require('../services/driver.service.js')

class DriverController {
  driverService = new DriverService()

}

module.exports = DriverController