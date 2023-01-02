const LoginService = require('../services/login.service.js')

class LoginController {
  loginService = new LoginService()

  findLoginUser = async (req, res, next) => {
    const {id, password, type} = req.body

    if(!id || !password) return res.status(400).json({errorMessage : '값을 입력하세요.'})

    try {
      if(type === 'customer') {
        const customer = await this.loginService.findOneCustomer(id)
  
        if(!customer || password !== customer.password) return res.status(412).json({errorMessage : '아디이 또는 패스워드가 일치하지 않습니다.'})
  
        const accessToken = jwt.sign({customerId : customer.customerId}, 'my-secrect-key', {expiresIn : '1d'})
        res.cookie('accessToken', accessToken)
  
        return res.status(200).json({accessToken : accessToken})
      } else {
        const driver = await this.loginService.findOneDriver(id)
  
        if(!driver || password !== driver.password) return res.status(412).json({errorMessage : '아이디 또는 패스워드가 일치하지 않습니다.'})
  
        const accessToken = jwt.sign({driverId : driver.driverId}, 'my-secrect-key', {expiresIn : '1d'})
        res.cookie('accessToken', accessToken)
        
        return res.status(200).json({accessToken : accessToken})
      }
    } catch (err) {
      return res.status(500).json({errorMessage : err})
    }
  }
}

module.exports = LoginController