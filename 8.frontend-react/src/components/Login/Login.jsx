import React, { useState } from "react";
import Input from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/Input/Input.jsx";
import Button from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/Button/Button.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

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
      .post("http://localhost:8005/", { form: formattedForm })
      .then(function (response) {
        alert("log in");
      })
      .catch(function (error) {
        //All the invalid data
        const invalid = error.response.data.invalidInput;
        invalid.forEach((invalidInput) => {
          setForm((prevForm) => ({
            ...prevForm,
            [invalidInput]: {
              value: prevForm[invalidInput].value,
              isInvalid: true,
            },
          }));
        });
      });
  };

  return (
    <div className="body">
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
            form.password.value ? "Wrong password." : "A password is required."
          }
          onChange={onChange}
        />
        <Button text="Login" onClick={onSubmit} />
        <h4>
          Don't have an account? <Link to="/signUp">Join now</Link>
        </h4>
      </div>
    </div>
  );
};

export default Login;
