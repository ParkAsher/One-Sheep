const jwt = require('jsonwebtoken')
const {Driver} = require('../models')
const {Customer} = require('../models')

module.exports = async (req, res, next) => {
  const { cookie } = req.headers;
  const {type} = req.body
  const [authType, authToken] = (cookie || "").split("=");

  if(authType !== 'accessToken' || !authToken) return res.status(400).json({success : false, message : '로그인 후 사용이 가능한 API입니다.'})

  try {
    if(type === 'customer') {
      const {customerId} = jwt.verify(authToken, 'my-secrect-key')
      const customer = await Customer.findByPk(customerId)
      res.locals.user = customer.dataValues
      next()
    } else {
      const {driverId} = jwt.verify(authToken, 'my-secrect-key')
      const driver = await Driver.findByPk(driverId)
      res.locals.user = driver.dataValues
      next()
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({errorMessage : err})
  }
}