import React from "react";
import LoginForm from "../views/LandingPage/LoginForm";
import { useDispatch } from "react-redux";
import { login } from "../../modules/account.js";
import { withRouter } from "react-router-dom";

const LoginFormContainer = (props) => {
  const dispatch = useDispatch();
  const handleLogin = (account) => dispatch(login(account));
  return <LoginForm handleLogin={handleLogin} props={props} />;
};

export default withRouter(LoginFormContainer);
