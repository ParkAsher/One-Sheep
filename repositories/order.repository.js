const { Op } = require('sequelize');

class OrderRepository {
    constructor(OrderModel, CustomerModel) {
        // 의존성 주입
        this.orderModel = OrderModel;
        this.customerModel = CustomerModel;
    }

    // 해당 오더가 존재하는지 찾기
    findOneOrder = async (orderId) => {
        try {
            const findOneOrder = await this.orderModel.findByPk(orderId);
            return findOneOrder;
        } catch (error) {
            // DB에서 발생한 Error
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };

    // 사장페이지 오더 가져오기
    findDriverOrder = async (driverId) => {
        try {
            // Order DB에 해당하는 사장의 내역이 있는지?
            // 고객 이름을 가져오기 위해 Customer DB와 inn
            const findOrder = await this.orderModel.findAll({
                order: [['createdAt', 'DESC']],
                where: { driverId },
                include: [
                    {
                        model: this.customerModel,
                        attributes: ['name'],
                        required: true,
                    },
                ],
            });
            return findOrder;
        } catch (error) {
            // DB에서 발생한 Error
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            console.log(error);
            throw error;
        }
    };

    // 오더 신청
    createOrder = async (customerId, driverId, phone, address, request, status, usageDateTimeStart, usageTime) => {
        try {
            const createOrderData = await this.orderModel.create({
                customerId,
                driverId,
                phone,
                address,
                request,
                status,
                usageDateTimeStart,
                usageTime,
            });

            return createOrderData;
        } catch (error) {
            // DB에서 발생한 Error
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };

    // 오더 신청할 때 해당 driverId에 진행 중인 오더가 있는지 확인
    ifOrderInProgress = async (driverId) => {
        try {
            // driverId에 해당되는 오더 중에 완료 안 된 오더가 있으면 오더 신청 불가능하게 막음
            const findOrder = await this.orderModel.findAll({
                where: {
                    driverId,
                    status: { [Op.notIn]: ['완료', '취소'] },
                },
            });

            return findOrder;
        } catch (error) {
            // DB에서 발생한 Error
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };

    // 사장페이지 오더 상태변경
    changeStatus = async (orderId, status) => {
        try {
            await this.orderModel.update({ status }, { where: { orderId } });
            return { status: 200, success: true, message: '수정에 성공했습니다.' };
        } catch (error) {
            // DB에서 발생한 Error
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };
}

module.exports = OrderRepository;
