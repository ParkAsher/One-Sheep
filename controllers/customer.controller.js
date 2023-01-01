const customerService = require("../services/customer.services");

// 컨트롤러(Controller)역할을 하는 클래스
class customerController {
  customerService = new customerService();
  // 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getUseruse = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const Useruse = await this.customerService.findAllPost();

    res.status(200).json({ data: Useruse });
  };

  createContent = async (req, res, next) => {
    const { nickname, password, title, content } = req.body;

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const ContentData = await this.customerService.createContent(
      nickname,
      password,
      title,
      content
    );

    res.status(201).json({ data: ContentData });
  };
}

module.exports = customerController;
