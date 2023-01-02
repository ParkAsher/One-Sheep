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

    // 특정 사장님 캠핑카 정보 조회
    getDriverById = async (driverId) => {
        try {
            // 사장 DB에 해당 id가 존재하는지 확인
            const driver = await this.driverModel.findAll({
                where: {driverId},
                attributes: ['name', 'image']
            })

            return driver
        } catch (error) {
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    }
}

module.exports = DriverRepository;
