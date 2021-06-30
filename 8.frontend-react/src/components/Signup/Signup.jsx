import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import SideBoarding from "./SideBoarding";
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({
    first_name: {
      value: "",
      isInvalid: false,
    },
    last_name: {
      value: "",
      isInvalid: false,
    },
    account_name: {
      value: "",
      isInvalid: false,
    },
    phone: {
      value: "",
      isInvalid: false,
    },
    email: {
      value: "",
      isInvalid: false,
      isExist: false,
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
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      account_name: form.account_name.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
    };
    axios
      .post("http://localhost:8005/", { form: formattedForm })
      .then(function (response) {
        window.location.href = "http://localhost:3000/homePage";
      })
      .catch(function (error) {
        //All the invalid data
        const invalid = error.response.data.invalidInput;
        if (!invalid) {
          setForm((prevForm) => ({
            ...prevForm,
            email: {
              value: prevForm["email"].value,
              isExist: true,
            },
          }));
        } else {
          invalid.forEach((invalidInput) => {
            setForm((prevForm) => ({
              ...prevForm,
              [invalidInput]: {
                value: prevForm[invalidInput].value,
                isInvalid: true,
              },
            }));
          });
        }
      });
  };

  return (
    <div className="body">
      <div className="sign-up">
        <h1>Sign up and start your trial</h1>
        <Input
          placeholder="First name"
          type="text"
          value={form.first_name.value}
          name={"first_name"}
          onChange={onChange}
        />
        <Input
          placeholder="Last name"
          type="text"
          value={form.last_name.value}
          name={"last_name"}
          onChange={onChange}
        />
        <Input
          placeholder="Account Name"
          type="text"
          value={form.account_name.value}
          name={"account_name"}
          onChange={onChange}
        />
        <Input
          placeholder="Phone number"
          type="phone"
          value={form.phone.value}
          name={"phone"}
          isInvalid={form.phone.isInvalid}
          text={
            form.phone.value
              ? "Invalid phone number."
              : "A phone number is required."
          }
          onChange={onChange}
        />
        <Input
          placeholder="Email address"
          type="email"
          value={form.email.value}
          name={"email"}
          isExist={form.email.isExist}
          textExist={"Account already exists"}
          isInvalid={form.email.isInvalid}
          text={
            form.email.value
              ? "Invalid email address."
              : "An email address is required."
          }
          onChange={onChange}
        />
        <Input
          placeholder="Password (at list 8 characters long)"
          type="password"
          value={form.password.value}
          name={"password"}
          isInvalid={form.password.isInvalid}
          text={
            form.password.value
              ? "Try 8 characters, at list 1 number."
              : "A password is required."
          }
          onChange={onChange}
        />
        <Button text="Sign Up" onClick={onSubmit} />
        <h4>
          Already have an account? <Link to="/login">Login</Link>
        </h4>
      </div>
      <div>
        <SideBoarding />
      </div>
    </div>
  );
};

export default SignUp;
