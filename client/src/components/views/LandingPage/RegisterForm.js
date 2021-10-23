import React, { useState } from "react";

const RegisterForm = ({ props, handleRegister }) => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const { email, name, nickname, password, confirmPassword } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다");
    }
    const account = {
      email,
      name,
      password,
      confirmPassword,
    };
    handleRegister(account).then((response) => {
      if (response.payload.success) {
        props.history.push("/");
      } else {
        alert("회원가입 에러");
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
        <input
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          required
        />
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={onChange}
          required
        />
        <label>NickName</label>
        <input
          name="nickname"
          type="text"
          value={nickname}
          onChange={onChange}
          required
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          required
        />
        <label>Confirm password</label>
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onChange}
          required
        />
        <br />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
};

export default RegisterForm;
