const DriverRepository = require("../repositories/driver.repository.js");
const {Driver} = require("../models/index.js");

class DriverService {
    // Repository
    driverRepository = DriverRepository(Driver);
}

module.exports = DriverService;
