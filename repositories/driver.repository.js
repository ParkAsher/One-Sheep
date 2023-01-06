const { name } = require('ejs');
const order = require('../models/order');
const { Order, Driver } = require('../models');
const sequelize = require('sequelize');
const { Association } = require('sequelize');
const { Op } = require('sequelize');
class DriverRepository {
    constructor(CustomerModel, DriverModel) {
        // 의존성 주입
        this.customerModel = CustomerModel;
        this.driverModel = DriverModel;
    }

    // 해당 id를 가진 유저가 이미 존재하는지
    isUserExist = async (id) => {
        try {
            // 고객 DB에 존재하는지?
            const existCustomer = await this.customerModel.findAll({
                where: { id },
            });

            // 사장 DB에 존재하는지?
            const existDriver = await this.driverModel.findAll({
                where: { id },
            });
            return [existCustomer, existDriver];
        } catch (error) {
            // DB에서 발생한 Error
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };

    createUser = async (id, name, password, image) => {
        try {
            await this.driverModel.create({ id, name, password, image });
            return { status: 200, success: true, message: '회원가입에 성공하였습니다.' };
        } catch (error) {
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };

    // DB에서 찾아준다..
    // driver image / name
    getDriver = async () => {
        try {
            // Order table에서 '완료'를 제외한 상태를 가진 사장들을 Driver table에서 뽑아줌
            const unavailableDrivers = await Order.findAll({
                include: [{ model: Driver }],
                where: {
                    // [Op.and]: [{ a: 5 }, { b: 6 }],
                    // [Op.notLike]: [{status: "완료"}],
                    status: { [Op.notIn]: ['완료', '취소'] },
                },
            });
            // 위에서 뽑은 사장들의 ID만 따로뽑아서 배열을 만듬.
            const unavailableDriverIds = unavailableDrivers.map((obj) => obj.driverId); // [1, 2, 2, 3]
            // 중복제거
            const uniqueUnavailableDriverIds = Array.from(new Set(unavailableDriverIds));

            // [{driverId: 4, name: "hello"},{driverId: 4, name: "hello"},{driverId: 5, name: "hello"}]
            // [{driverId: 4, name: "hello"}, {driverId: 5, name: "hello"}] => acc
            // 처음 뽑아낸 '완료'를 제외한 상태를 가진 사장들의 정보들을 통째로 중복제거
            const uniqueUnavailableDrivers = unavailableDrivers.reduce((acc, el) => {
                if (!acc.find((obj) => obj.driverId === el.driverId)) {
                    // 비교배열에 대조배열 객체가 있는지 확인 후 만일 없으면?
                    return [...acc, el]; // 비교배열에 대조배열을 더해라. 단 if 조건문을 만족하는 경우에만!
                }
                return acc;
            }, []);

            // Driver table에서 ['완료'를 제외한 상태를 가진 사장들의 id를 가지고] 그 사장들이 아닌 사장들을 뽑아냄
            const availableDrivers = await Driver.findAll({
                where: {
                    driverId: { [Op.notIn]: uniqueUnavailableDriverIds },
                },
            });

            return { availableDrivers, uniqueUnavailableDrivers };
        } catch (error) {
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };

    // 특정 사장님 캠핑카 정보 조회
    getDriverById = async (driverId) => {
        try {
            // 사장 DB에 해당 id가 존재하는지 확인
            const driver = await this.driverModel.findAll({
                where: { driverId },
                attributes: ['name', 'image'],
            });

            return driver;
        } catch (error) {
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };
}

module.exports = DriverRepository;
