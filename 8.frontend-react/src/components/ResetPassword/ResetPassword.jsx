import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const [form, setForm] = useState({
    password: {
      value: "",
      isInvalid: false,
    },
    id: -1,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const params = new URLSearchParams(window.location.search).get("accessToken");

  useEffect(() => {
    const validToken = () => {
      axios
        .get("http://localhost:8005/resetPassword", { params })
        .then((result) => {
          setIsLoading(false);
          setIsTokenValid(true);
          setForm((prevForm) => ({
            ...prevForm,
            id: result.data.id,
          }));
        })
        .catch((err) => {
          setIsLoading(false);
        });
    };
    validToken();
  }, [params]);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isInvalid: false },
    });
  };

  const onSubmit = () => {
    const formattedForm = {
      password: form.password.value,
      id: form.id,
    };
    axios
      .post("http://localhost:8005/resetPassword", { form: formattedForm })
      .then(function (response) {
        alert("Password has been changed");
        window.location.href = "http://localhost:3000/login";
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
      {isLoading ? (
        <LoadingSpinner text={"loading..."} className="forgot-password" />
      ) : isTokenValid ? (
        <div className="reset-password">
          <div className="form">
            <h1>Enter a new password</h1>
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
            <Button id="login-button" text="Reset" onClick={onSubmit} />
          </div>
        </div>
      ) : (
        <LoadingSpinner
          text={"Token is not valid"}
          className="forgot-password"
        />
      )}
    </div>
  );
};

export default ResetPassword;
