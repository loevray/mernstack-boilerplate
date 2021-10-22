import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../modules/account";

export default function (SpecificComponent, option, adminRoute = null) {
  //null 아무나 출입 가능
  //true 로그인 한 유저만 가능
  //false 로그인 한 유저는 불가능

  const AuthenticationCheck = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (!option) {
              props.history.push("/");
            }
          }
        }
      });
      axios.get("/api/users/auth");
    }, []);
    return <SpecificComponent />;
  };
  return AuthenticationCheck;
}
