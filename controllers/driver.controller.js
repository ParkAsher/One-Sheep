const DriverService = require('../services/driver.service.js')
const jwt = require('jsonwebtoken')

const cookieParser = require("cookie-parser")
router.use(cookieParser())

class DriverController {
  driverService = new DriverService()

}

module.exports = DriverController