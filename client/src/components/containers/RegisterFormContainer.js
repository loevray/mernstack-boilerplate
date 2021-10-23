import React from "react";
import { useDispatch } from "react-redux";
import { register } from "../../modules/account";
import { withRouter } from "react-router-dom";
import RegisterForm from "../views/LandingPage/RegisterForm";

const RegisterFormContainer = (props) => {
  const dispatch = useDispatch();
  const handleRegister = (account) => dispatch(register(account));
  return <RegisterForm handleRegister={handleRegister} props={props} />;
};

export default withRouter(RegisterFormContainer);
