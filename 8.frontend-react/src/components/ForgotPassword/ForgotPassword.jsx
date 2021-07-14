import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import axios from "axios";
import styles from "./ForgotPassword.module.scss";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: {
      value: "",
      isInvalid: false,
    },
  });

  const [sentLink, setSentLink] = useState(false);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isInvalid: false },
    });
  };

  const sendEmail = async () => {
    const formattedForm = {
      email: form.email.value,
    };

    axios
      .post("http://localhost:8005/forgotPassword", { form: formattedForm })
      .then(function (response) {
        setSentLink(true);
      })
      .catch(function (error) {
        console.log(error);
        //The incorrect email.
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
    <div>
      {sentLink ? (
        <LoadingSpinner
          validToken={() => ""}
          text={"We sent a reset link to your email"}
          className={styles.forgotPassword}
        />
      ) : (
        <div className={styles.forgotPassword}>
          <div className={styles.form}>
            <h1>Enter your email address</h1>
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
            <Button
              id="reset-button"
              text="Reset password"
              onClick={sendEmail}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
