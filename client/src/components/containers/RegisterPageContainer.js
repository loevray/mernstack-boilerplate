import React from "react";
import { useDispatch } from "react-redux";
import RegisterPage from "../views/RegisterPage/RegisterPage";
import { register } from "../../modules/account";
import { withRouter } from "react-router-dom";

const RegisterPageContainer = (props) => {
  const dispatch = useDispatch();
  const handleRegister = (account) => dispatch(register(account));
  return <RegisterPage handleRegister={handleRegister} props={props} />;
};

export default withRouter(RegisterPageContainer);
