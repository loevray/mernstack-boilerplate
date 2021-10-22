const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증 처리 하는곳
  //클라이언트측 쿠키에서 토큰 가져옴
  let token = req.cookies.x_auth;
  //가져온 토큰을 복호화 한 후 db와 대조해서 유저를 찾음.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    //유저와 토큰정보를 req에 넣어준 건, index의 auth의 req에서 써먹을라고.
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
