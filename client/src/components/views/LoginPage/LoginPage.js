import React, { useState } from "react";

const LoginPage = ({ handleLogin, props }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const account = {
      email,
      password,
    };
    handleLogin(account).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("로그인 에러");
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
      <form
        style={{ display: "Flex", flexDirection: "column" }}
        onSubmit={onSubmit}
      >
        <label>Email</label>
        <input name="email" type="email" value={email} onChange={onChange} />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
