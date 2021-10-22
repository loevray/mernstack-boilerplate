import React, { useState } from "react";

const RegisterPage = ({ props, handleRegister }) => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const { email, name, password, confirmPassword } = inputs;
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
        <input name="email" type="email" value={email} onChange={onChange} />
        <label>Name</label>
        <input name="name" type="text" value={name} onChange={onChange} />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
        <label>Confirm password</label>
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onChange}
        />
        <br />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
