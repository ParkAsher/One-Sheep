const express = require('express');
const router = express.Router();

const driverRouter = require('./driver.routes');
const customerRouter = require('./customer.routes');
const loginRouter = require('./login.routes')
router.use('/user', [driverRouter, customerRouter, loginRouter]);


const orderRouter = require('./order.routes')
router.use('/order', orderRouter)

module.exports = router;