class CustomerRepository {
    constructor(CustomerModel) {
        // 생성자 주입
        this.customerModel = CustomerModel;
    }
}


module.exports = CustomerRepository;
