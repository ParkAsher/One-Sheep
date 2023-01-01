const { Order, Driver } = require("../models");

class customerRepository {
  // 회원 이용내역 조회
  //{phone, address, status, usageDateTimeStart, usageTime}

  // 내가해야할 것!
  // orders테이블에서 customerid에 해당하는 정보들을 가져오는 작업.
  // 1. customerid 에 해당하는 정보를 받아온다.
  // 2. 정보들 중에서 내가 필요한 정보들을 req.body에 담는다.
  // 3. service에 res.json의 형식으로 보내준다.

  findorders = async () => {
    // 1. customerid 에 해당하는 정보를 받아온다.
    customerid = req.params.customerid;
    orders = await Order.find({ customerid }).sort({ createdAt: -1 });

    // 2.

    // 3. service에 res.json의 형식으로 보내준다.
    return res.status(200).json({ success: true, orders });
  };

  // id에 해당하는 값을 params로 받는 작업
  // const postId = req.params._postId;

  //선언한 변수에 id에 해당하는 값을 post테이블에서 찾아서 다 담는 작업
  // const posts = await Post.find({ postId });

  // posts라는 변수에 담은 값을 보내주는 작업
  // return res.status(200).json({ success: true, posts });

  //   const postId = req.params._postId; // 객체구조 분해할당  const { postId } = req.parmas;

  //   const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

  //   return res.status(200).json({ success: true, comments });
  // });

  // findAllorders = async () => {
  //   //   // ORM인 Sequelize에서 orders 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
  //   const orders = await Order.findAll();
  //   return orders;
  // };
  // createcontent = async (nickname, password, title, content) => {
  //   // ORM인 Sequelize에서 orders 모델의 create 메소드를 사용해 데이터를 요청합니다.
  //   const createcontentData = await order.create({
  //     nickname,
  //     password,
  //     title,
  //     content,
  //   });
  //   return createcontentData;
  // };
}

module.exports = customerRepository;
