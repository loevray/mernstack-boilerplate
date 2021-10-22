import axios from "axios";

const LOGIN = "account/LOGIN";
const REGISTER = "account/REGISTER";
const AUTH = "account/AUTH";

//액션 생성 함수들

//로그인
export const login = (account) => {
  const request = axios
    .post("/api/users/login", account)
    .then((respones) => respones.data);
  return {
    type: LOGIN,
    payload: request,
  };
};
//회원가입
export const register = (account) => {
  const request = axios
    .post("/api/users/register", account)
    .then((respones) => respones.data);
  return {
    type: REGISTER,
    payload: request,
  };
};
//인증
export const auth = () => {
  const request = axios
    .get("/api/users/auth")
    .then((respones) => respones.data);
  return {
    type: AUTH,
    payload: request,
  };
};

//초기값
const initailState = {};

//리듀서
export default function account(state = initailState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, loginSuccess: action.payload };
    case REGISTER:
      return { ...state, register: action.payload };
    case AUTH:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
