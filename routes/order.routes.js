const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

const {Order} = require('../models')

router.post('/order/:driverId', orderController.createOrder)


// router.post('/order/:driverId', async (req, res) => {
//     const driverId = req.params
//     const {phone, address, usageDateTimeStart, usageTime} = req.body

//     // authMiddleware에서 userId 가져와야함
//     const { customer } = res.locals 
//     const customerId = customer.dataValues.customerId

//     try {
//         const order = await Order.create({
//             customerId,
//             driverId,
//             phone,
//             address,
//             request,
//             usageDateTimeStart,
//             usageTime
//         })

//         res.status(201).json(order)

//     } catch (error) {
//         res.status(400).send(error)
//     }


// })

router.get('/order/:customerId', async (req,res) => {
    
})

module.exports = router;
