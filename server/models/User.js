const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //비밀번호 암호화를 위한 해쉬함수
const saltRounds = 10; //해시계산에 대한 비용. 높을수록 암호화가 뛰어남.
const jwt = require("jsonwebtoken");

//스키마를 만들었다. 체계?
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 12,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 6,
  },
  lastname: {
    type: String,
    maxlength: 12,
  },
  role: {
    type: Number,
    default: 0, //0이 아니면 관리자
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//유저 정보를 저장하기 직전에 function 실행. 미들웨어 같은 느낌.
userSchema.pre("save", function (next) {
  let userSchemaRef = this;

  //패스워드가 수정될때만 실행.
  if (userSchemaRef.isModified("password")) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(userSchemaRef.password, salt, function (err, hash) {
        if (err) return next(err);
        userSchemaRef.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//
userSchema.methods.comparePassword = function (plainPassword, cbfn) {
  //bcrypt의 내장함수(메소드). 두 패스워드를 비교해준다.
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cbfn(err);
    //두 암호가 일치하면 두번째 파라미터로 isMatch를 넘겨준다.
    cbfn(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cbfn) {
  let userSchemaRef = this;
  //jwt를 이용해 토큰 생성 id + 문자열 = 토큰
  const token = jwt.sign(userSchemaRef._id.toHexString(), "secretToken");
  //부여한 토큰을 db(서버)에 넣어줌
  userSchemaRef.token = token;
  userSchemaRef.save(function (err, user) {
    if (err) return cbfn(err);
    cbfn(null, user);
  });
};

userSchema.statics.findByToken = function (token, cbfn) {
  let userSchemaRef = this;

  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾는다
    //클라에서 가져온 토큰과 db에 보관된 토큰 일치확인
    userSchemaRef.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cbfn(err);
      cbfn(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
