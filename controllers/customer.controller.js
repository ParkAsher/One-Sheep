const CustomerService = require("../services/customer.service.js");

// Joi
const { customerRegisterValidateSchema } = require("../lib/JoiSchema.js");

class CustomerController {
  // Service
  customerService = new CustomerService();

  // 고객 회원가입
  signUp = async (req, res, next) => {
    try {
      const { id, name, password, passwordCheck } =
        await customerRegisterValidateSchema.validateAsync(req.body);

      const signUpResult = await this.customerService.createUser(
        id,
        name,
        password
      );

      return res
        .status(signUpResult.status)
        .json({ success: signUpResult.success, message: signUpResult.message });
    } catch (error) {
      // Joi Error
      if (error.name === "ValidationError") {
        error.status = 412;
        error.success = false;
        switch (error.details[0].path[0]) {
          case "id":
            if (error.details[0].type === "string.empty") {
              error.message = "아이디를 입력해주세요.";
              break;
            }
            error.message = "아이디의 형식이 일치하지 않습니다.";
            break;
          case "name":
            if (error.details[0].type === "string.empty") {
              error.message = "이름을 입력해주세요.";
              break;
            }
            error.message = "이름의 형식이 일치하지 않습니다.";
            break;
          case "password":
            if (error.details[0].type === "string.empty") {
              error.message = "비밀번호를 입력해주세요.";
              break;
            }
            error.message = "이름의 형식이 일치하지 않습니다.";
            break;
          case "passwordCheck":
            if (error.details[0].type === "string.empty") {
              error.message = "비밀번호 확인을 입력해주세요.";
              break;
            }
            error.message = "비밀번호가 일치하지 않습니다.";
            break;
          default:
            break;
        }
      }
      console.log(error);
      return res
        .status(error.status)
        .json({ success: error.success, message: error.message });
    }
  };
}

module.exports = CustomerController;
