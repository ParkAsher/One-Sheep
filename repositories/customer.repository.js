const { Sequelize } = require('sequelize');
const { Review, sequelize } = require('../models/index.js');

class CustomerRepository {
    constructor(CustomerModel, DriverModel, OrderModel) {
        // 의존성 주입
        // 서비스에서 정보를 미리 불러오고 넘겨주는것.
        this.customerModel = CustomerModel;
        this.driverModel = DriverModel;
        this.orderModel = OrderModel;
    }

    // 해당 회원번호를 가진 고객이 이미 존재하는지
    isCustomerExist = async (customerId) => {
        try {
            // 고객 DB에서 찾는다
            const existCustomer = await this.customerModel.findAll({
                where: { customerId },
            });

            return existCustomer;
        } catch (error) {
            // DB에서 발생한 Error
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };

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

    createUser = async (id, name, password) => {
        try {
            await this.customerModel.create({ id, name, password });
            return {
                status: 200,
                success: true,
                message: '회원가입에 성공하였습니다.',
            };
        } catch (error) {
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };

    // 회원 이용내역 조회
    // 1. order 모델에서 customerid에 해당하는 값을 받아온다.
    // 2. 받아온 값 중에서 내가 필요한 값을 뽑아낸다.
    // 3. return 해준다.

    // 1. orders 테이블에서 customerid에 해당하는 값을 받아온다.
    getUserUse = async (customerId) => {
        try {
            const existOrder = await this.orderModel.findAll({
                // 2. 받아온 값 중에서 내가 필요한 값을 뽑아낸다.
                attributes: ['orderId', 'phone', 'address', 'status', 'usageDateTimeStart', 'usageTime'],
                where: { customerId },
                include: [
                    {
                        model: Review,
                        attributes: ['stars', 'content'],
                    },
                ],
                order: [['usageDateTimeStart', 'DESC']],
            });

            // 3. return 해준다.
            return existOrder;
        } catch (error) {
            // DB에서 발생한 Error
            console.log(error);
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };

    // 포인트 차감
    pointDeduct = async (customerId, deductionPoint) => {
        try {
            await this.customerModel.decrement({ point: deductionPoint }, { where: { customerId } });
            return { status: 200, success: true, message: '포인트 차감!' };
        } catch (error) {
            // DB에서 발생한 Error
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };
}

module.exports = CustomerRepository;
