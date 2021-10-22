const express = require("express");
const app = express();
const port = 3001;
const config = require("./config/key");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");

// 1)app/x-www-form-urlencoded를 파싱하게 해준다
// 2)app/json을 파싱하게 해준다.
// 3)쿠키파싱
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//몽구스 설정. 몽구스 설치하면 자동으로 mongodb도 깔림.
const mongoose = require("mongoose");
const { auth } = require("./middleware/auth");
mongoose
  .connect(config.mongoURI) //로컬로 사용할거면 'mongodb://localhost:27017/사용할db이름' 이렇게 적는다.
  .then(() => console.log("mongodb connected nice!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!asdasdas");
});

app.post("/api/users/register", (req, res) => {
  //스키마를 가져와서 request의body에 담긴 정보를 넣는다.
  const user = new User(req.body);

  //db에 넣는다.
  //에러냐 성공이냐에 따라 success를 respone해줌, http 코드 200은 성공이라는 뜻!
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/users/login", (req, res) => {
  //1요청된 이메일을 데이터베이스에 있는지 찾음.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: `입력하신 이메일(${req.body.email})과 일치하는 유저가 없습니다.`,
      });
    }
    //만약 있다면, 비밀번호도 데이터베이스에 있는지 찾는다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      //isMatch가 반환되지 않았다면 실패.
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 맞지 않습니다.",
        });
      //isMatch가 반환됐다면 토큰발급
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 쿠키(클라이언트)에 저장
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

//유저가 로그인 되어있는지 확인하는 함수
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요~");
});

app.listen(port, () => {
  console.log(`포트 연결 성공 http://localhost:${port}`);
});
