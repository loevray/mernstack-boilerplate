import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";

const LandingPage = (props) => {
  const onClick = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
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
      <button onClick={onClick}>로그아웃</button>
    </div>
  );
};

export default withRouter(LandingPage);
