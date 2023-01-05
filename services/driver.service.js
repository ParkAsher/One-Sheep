const DriverRepository = require('../repositories/driver.repository.js');
const { Customer, Driver } = require('../models/index.js');
const bcrypt = require('bcrypt');

class DriverService {
    // Repository
    driverRepository = new DriverRepository(Customer, Driver);

    createUser = async (id, name, password, image) => {
        try {
            // 해당 id를 가진 유저가 이미 존재하는지
            const existUser = await this.driverRepository.isUserExist(id);
            // 존재한다면?
            if (existUser[0].length !== 0 || existUser[1].length !== 0) {
                const error = new Error('이미 사용중인 아이디입니다.');
                error.name = 'Already User Existed';
                error.status = 400;
                throw error;
            }
        } catch (error) {}
    };

    createUser = async (id, name, password, image) => {
        try {
            // 해당 id를 가진 유저가 이미 존재하는지
            const existUser = await this.driverRepository.isUserExist(id);
            // 존재한다면?
            if (existUser[0].length !== 0 || existUser[1].length !== 0) {
                const error = new Error('이미 사용중인 아이디입니다.');
                error.name = 'Already User Existed';
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

    getDriver = async () => {
        const { availableDrivers, uniqueUnavailableDrivers } = await this.driverRepository.getDriver();

        // 클라이언트에서 보낸 요청을 컨트롤러에서 받음 -> 위에는 1번테이블, 2에는 2번테이블 달라 ->객체로 담아달라
        // 서비스가 하는일
        // 1. 레포지토리에서 받아온 객체의 정보에서 필요한 정보를 받아볼 수 있게 가공함.
        // 2. 각각의 정보를 객체에 담고 그걸 컨트롤러에서 받은 요청과 매치시킴.
        const availableCar = availableDrivers.map(({ driverId, name, image, createdAt, updatedAt }) => {
            return {
                driverId,
                name,
                image,
                createdAt,
                updatedAt,
            };
        });

        const unavailableCar = uniqueUnavailableDrivers.map((driver) => {
            const { driverId, name, image, createdAt, updatedAt } = driver.dataValues.Driver;
            return {
                driverId,
                name,
                image,
                createdAt,
                updatedAt,
            };
        });

        availableCar.sort((a, b) => {
            return a.createdAt - b.createdAt;
        });

        // 값이 비어있어도 오류는 아니다!
        return { availableCar, unavailableCar };
    };

    // 특정 사장님 캠핑카 정보 조회
    getDriverById = async (driverId) => {
        try {
            const driver = await this.driverRepository.getDriverById(driverId);

            // 해당 ID에 존재하는 사장이 없으면 throw error
            if (driver.length === 0) {
                const error = new Error('해당 ID에 존재하는 사장님이 없습니다.');
                error.name = 'ID does not exist';
                error.status = 404;
                error.success = false;

                throw error;
            }

            return driver[0];
        } catch (error) {
            throw error;
        }
    };
}
module.exports = DriverService;
