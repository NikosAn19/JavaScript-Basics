import "./Register.css";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRergisterQuery } from "./useRegisterQuery";
import { useLoginQuery } from "./useLoginQuery";
import { useEffect } from "react";
import { RegisterFields } from "../../Types/RegisterFields";
import { LoginFields } from "../../Types/LoginFields";

export default function Register() {
  const { registerUser, error } = useRergisterQuery();
  const { token, loginUser, loginError } = useLoginQuery();

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors },
  } = useForm<RegisterFields>();
  const onRegister: SubmitHandler<RegisterFields> = (data) => {
    console.log("Data entered in front end :", data);
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    registerUser(user).then((response) => console.log(response));
    if (error) console.error(error);
  };

  const { register: loginRegister, handleSubmit: handleSumbitLogin } =
    useForm<LoginFields>();
  const onLogin: SubmitHandler<LoginFields> = async (data) => {
    console.log("Data entered in front end :", data);

    const user = {
      email: data.username,
      password: data.password,
    };

    await loginUser(user).then((response) => {
      console.log("Response from custom hook:", response);
    });

    if (loginError) console.error(loginError);
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <>
      <div className="user__container">
        <div className="register__area">
          <h2>Register</h2>
          <form onSubmit={handleSubmitRegister(onRegister)}>
            <div className="input__box">
              <input
                {...registerRegister("username")}
                type="text"
                placeholder=" "
                required
              ></input>
              <span>Username</span>
            </div>
            <div className="input__box">
              <input
                {...registerRegister("email")}
                type="email"
                placeholder=" "
                required
              ></input>
              <span>Email</span>
            </div>
            <div className="input__box">
              <input
                {...registerRegister("password")}
                type="password"
                placeholder=" "
                required
              ></input>
              <span>Password</span>
            </div>
            <div className="input__box">
              <input
                {...registerRegister("confirm_password")}
                type="password"
                placeholder=" "
                required
              ></input>
              <span>Confirm Password</span>
            </div>
            <button type="submit">Register</button>
            {error && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {" "}
                There is a User with this Email
              </p>
            )}
          </form>
        </div>

        <hr className="separator"></hr>

        <div className="register__area">
          <h2>Login</h2>
          <form onSubmit={handleSumbitLogin(onLogin)}>
            <div className="input__box">
              <input
                {...loginRegister("username")}
                type="email"
                placeholder=" "
                required
              ></input>
              <span>Username</span>
            </div>
            <div className="input__box">
              <input
                {...loginRegister("password")}
                type="password"
                placeholder=" "
                required
              ></input>
              <span>Password</span>
            </div>
            <button type="submit">Login</button>
            {loginError && (
              <p style={{ color: "red", fontSize: "14px" }}>
                Invalid Email or Password
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
