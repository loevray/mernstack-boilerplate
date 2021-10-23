import axios from "axios";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import LoginFormContainer from "../../containers/LoginFormContainer";
import RegisterFormContainer from "../../containers/RegisterFormContainer";

const LandingPage = (props) => {
  const [registerClick, setRegisterClick] = useState(false);
  const onToggleLogin = () => {
    setRegisterClick((prev) => !prev);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        color: "#9E75E1",
      }}
    >
      <h2>시작 페이지</h2>
      {registerClick ? <RegisterFormContainer /> : <LoginFormContainer />}
      <button onClick={onToggleLogin}>
        {registerClick ? "로그인" : "가입하기"}
      </button>
    </div>
  );
};

export default withRouter(LandingPage);
