import axios from "axios";
import React from "react";
import { withRouter } from "react-router";

const Home = (props) => {
  const onLogOutClick = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/");
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
      }}
    >
      여긴 @홈@
      <button onClick={onLogOutClick}>로그아웃</button>
    </div>
  );
};

export default withRouter(Home);
