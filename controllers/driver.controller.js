const DriverService = require("../services/driver.service");

// Post의 컨트롤러(Controller)역할을 하는 클래스
class DriverController {
    driverService = new driverService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

    getDrivers = async (req, res, next) => {
        // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
        const drivers = await this.driverService.findAllPost();

        res.status(200).json({data: posts});
    };
}
