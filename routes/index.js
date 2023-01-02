const express = require('express');
const router = express.Router();

const driverRouter = require('./driver.routes');
const customerRouter = require('./customer.routes');
<<<<<<< HEAD
const loginRouter = require('./login.routes')
=======
const loginRouter = require('./login.routes');
>>>>>>> b443c789483082af034bef344b55da9ee3c6970a
router.use('/users', [driverRouter, customerRouter, loginRouter]);

const orderRouter = require('./order.routes');
router.use('/orders', orderRouter);

<<<<<<< HEAD
const orderRouter = require('./order.routes')
router.use('/orders', orderRouter)

module.exports = router;
=======
module.exports = router;
>>>>>>> b443c789483082af034bef344b55da9ee3c6970a
