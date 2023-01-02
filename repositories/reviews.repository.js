// review 등록..
// 사용자가 리뷰를 등록한다.

//customers 테이블에서 customerid, name 이 필요함.

// 리뷰등록은 review테이블 안의 stars, content에 데이터 저장됨.

// 리뷰등록을 하면 customers 테이블의 customerid, name 도 보여지게 됨.

// 흠..

//일반적으로 게시글의 댓글 등록의 경우
// 1. 고유 게시글 id 를 가져와서
// 2.

// 게시글 작성처럼 하면 되는건가..?

//게시글 등록
// router.post("/", async (req, res) => {
//     /*
//       req.body = {
//           user: "Developer",
//           password: "1234",
//           title: "안녕하세요",
//           content: "안녕하세요 content 입니다."
//       }*/
//     // 객체 분해 할당
//     const { user, password, title, content } = req.body; //req.body 안에 들어있는 내용을 변수에 선언 할당
//     // const user = req.body.user;
//     // const password = req.body.password;
//     // const title = req.body.title;
//     // const content = req.body.content;

//     // 예외처리
//     if (
//       [user, password, title, content].includes("") ||
//       JSON.stringify(req.body) === "{}"
//     ) {
//       return res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
//     }

//     // 정상작동
//     // 생성
//     await Post.create({
//       user,
//       password,
//       title,
//       content,
//     });

//     //끝
//     return res.status(201).json({ message: "게시글을 생성하였습니다." });
//   });
