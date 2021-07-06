import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
// import "./Login.module.scss";

const Login = () => {
  const [form, setForm] = useState({
    email: {
      value: "",
      isInvalid: false,
    },
    password: {
      value: "",
      isInvalid: false,
    },
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isInvalid: false },
    });
  };

  const onSubmit = () => {
    const formattedForm = {
      email: form.email.value,
      password: form.password.value,
    };

    axios
      .post("http://localhost:8005/login", { form: formattedForm })
      .then(function (response) {
        window.localStorage.setItem("user_token", response.data.accessToken);
        window.location.href = "http://localhost:3000/homePage";
      })
      .catch(function (error) {
        //The incorrect input.
        let errorType = error.response.data.errors;
        //If email input is empty.
        if (!form.email.value) errorType = "email";

        //Sets the invalid input text in the page.
        setForm((prevForm) => ({
          ...prevForm,
          [errorType]: {
            value: prevForm[errorType].value,
            isInvalid: true,
          },
        }));
      });
  };

  return (
    <div className="body">
      {localStorage.getItem("user_token") ? (
        <Redirect to={"/homePage"} />
      ) : (
        <div className="log-in">
          <h1>Login</h1>
          <Input
            placeholder="Email address"
            type="email"
            value={form.email.value}
            name={"email"}
            isInvalid={form.email.isInvalid}
            text={
              form.email.value
                ? "Email is not exist."
                : "An email address is required."
            }
            onChange={onChange}
          />
          <Input
            placeholder="Password"
            type="password"
            value={form.password.value}
            name={"password"}
            isInvalid={form.password.isInvalid}
            text={
              form.password.value
                ? "Password is incorrect."
                : "A password is required."
            }
            onChange={onChange}
          />
          <Button text="Login" onClick={onSubmit} />
          <h4>
            Don't have an account? <Link to="/signUp">Join now</Link>
          </h4>
          <h4>
            <NavLink to="/forgotPassword">Forgot your password?</NavLink>
          </h4>
        </div>
      )}
    </div>
  );
};

export default Login;
