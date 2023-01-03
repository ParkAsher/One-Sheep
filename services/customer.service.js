const CustomerRepository = require("../repositories/customer.repository.js");
const { Customer, Driver } = require("../models/index.js");
const bcrypt = require("bcrypt");

class CustomerService {
  // Repository
  customerRepository = new CustomerRepository(Customer, Driver);

  createUser = async (id, name, password) => {
    try {
      // 해당 id를 가진 유저가 이미 존재하는지
      const existUser = await this.customerRepository.isUserExist(id);
      // 존재한다면?
      if (existUser[0].length !== 0 || existUser[1].length !== 0) {
        const error = new Error("이미 사용중인 아이디입니다.");
        error.name = "Already User Existed";
        error.status = 400;
        throw error;
      }

      // 비밀번호 암호화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 회원가입 진행
      return await this.customerRepository.createUser(id, name, hashedPassword);
    } catch (error) {
      throw error;
    }
  };

  // 회원 이용내역 조회
  getUserUse = async (customerId) => {
    try {
      // customerRepository에서 실행한 함수를 existgetUser 변수에 담는다.
      const existgetUser = await this.customerRepository.getUserUse(customerId);

      // 데이터 정보를 받은 existgetUser 변수를 return 해준다.
      return existgetUser;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CustomerService;
