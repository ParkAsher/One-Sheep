class DriverRepository {
    constructor(DriverModel) {
        // 생성자 주입
        this.driverModel = DriverModel;
    }
}

module.exports = DriverRepository;
