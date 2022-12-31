class CustomerRepository {
    constructor(CustomerModel) {
        // 생성자 주입
        this.customerModel = CustomerModel;
    }

    // 해당 id를 가진 유저가 이미 존재하는지
    isUserExist = async (id) => {
        try {
            const existUser = await this.customerModel.findAll({
                where: { id },
            });
            return existUser;
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
            return { status: 200, success: true, message: '회원가입에 성공하였습니다.' };
        } catch (error) {
            error.name = 'Database Error';
            error.message = '요청을 처리하지 못하였습니다.';
            error.status = 400;
            throw error;
        }
    };
}

module.exports = CustomerRepository;
