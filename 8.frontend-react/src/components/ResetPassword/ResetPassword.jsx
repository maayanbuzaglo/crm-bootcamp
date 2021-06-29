import React, { useState } from "react";
import Input from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/Input/Input.jsx";
import Button from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/Button/Button.jsx";
import axios from "axios";
import LoadingSpinner from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/LoadingSpinner/LoadingSpinner.jsx";

const ResetPassword = () => {
  const [form, setForm] = useState({
    password: {
      value: "",
      isInvalid: false,
    },
  });
  //-------------------------------------------------------
  const [state, setState] = useState({
    loading: true,
  });

  const params = new URLSearchParams(window.location.search).get("accessToken");

  const validToken = () => {
    axios
      .get("http://localhost:8005/resetPassword", { params })
      .then((result) =>
        setState({
          loading: false,
          data: [...result.data],
        })
      );
  };
  //-------------------------------------------------------
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isInvalid: false },
    });
  };

  const onSubmit = () => {
    const formattedForm = {
      password: form.password.value,
    };
    axios
      .post("http://localhost:8005/resetPassword", { form: formattedForm })
      .then(function (response) {
        alert("password changed");
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
      {state.loading ? (
        <LoadingSpinner validToken={validToken} />
      ) : (
        <div className="log-in">
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
      )}
    </div>
  );
};

export default ResetPassword;
