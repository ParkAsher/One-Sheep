const jwt = require("jsonwebtoken");
const { Driver } = require("../models");
const { Customer } = require("../models");

module.exports = async (req, res, next) => {
  const { cookie } = req.headers;
  //   const {type} = req.body
  const [authType, authToken] = (cookie || "").split("=");

  if (authType !== "accessToken" || !authToken)
    return res
      .status(400)
      .json({ success: false, message: "로그인 후 사용이 가능한 API입니다." });

  try {
    const { userId, type } = jwt.verify(authToken, "my-secrect-key");

    if (type === "customer") {
      //   const {customerId} = jwt.verify(authToken, 'my-secrect-key')
      const customer = await Customer.findOne({
        where: { customerId: userId },
      });
      const point = customer.point;

      console.log(customer);
      res.locals.user = { userId, type, point };
      next();
    } else {
      //   const {driverId} = jwt.verify(authToken, 'my-secrect-key')
      const driver = await Driver.findByPk(userId);
      res.locals.user = { userId, type };
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err });
  }
};
