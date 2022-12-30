const OrderService = require('../services/order.service.js')

class OrderController {
    createOrder = async (req,res) => {
        const driverId = req.params
        const {phone, address, usageDateTimeStart, usageTime} = req.body

        // authMiddleware에서 userId 가져와야함
        const { customer } = res.locals 
        const customerId = customer.dataValues.customerId

        try {
            const order = await OrderService.createOrder({
                customerId,
                driverId,
                phone,
                address,
                request,
                usageDateTimeStart,
                usageTime
            })
    
            res.status(201).json(order)
    
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = OrderController