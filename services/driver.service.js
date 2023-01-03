const DriverRepository = require("../repositories/driver.repository.js");
const {Customer, Driver} = require("../models/index.js");
const bcrypt = require("bcrypt");

class DriverService {
    // Repository
    driverRepository = new DriverRepository(Customer, Driver);

    createUser = async (id, name, password, image) => {
        try {
            // 해당 id를 가진 유저가 이미 존재하는지
            const existUser = await this.driverRepository.isUserExist(id);
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
            return await this.driverRepository.createUser(id, name, hashedPassword, image);
        } catch (error) {
            throw error;
        }
    };
    // 레포에서 불러온 사장정보 중 어떤 것을 가져올지? 데이터 가공
    // 대기중 사장/ 현재 일하고 있는 사장 정보를 나눠주기
    //
}

module.exports = DriverService;
