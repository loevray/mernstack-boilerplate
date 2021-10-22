import React from "react";
import LoginPage from "../views/LoginPage/LoginPage";
import { useDispatch } from "react-redux";
import { login } from "../../modules/account.js";
import { withRouter } from "react-router-dom";

const LoginPageContainer = (props) => {
  const dispatch = useDispatch();
  const handleLogin = (account) => dispatch(login(account));
  return <LoginPage handleLogin={handleLogin} props={props} />;
};

export default withRouter(LoginPageContainer);
