import React, { useState } from "react";
import Input from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/Input/Input.jsx";
import Button from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/Button/Button.jsx";
import Side from "../Signup/Side";
import axios from "axios";

const AddUser = () => {
  const [form, setForm] = useState({
    first_name: {
      value: "",
      isInvalid: false,
    },
    last_name: {
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
      email: form.email.value,
      phone: form.phone.value,
      // admin_id: window.localStorage.getItem("user_token")
    };
    axios
      .post("http://localhost:8005/addUser", { form: formattedForm })
      .then(function (response) {
        alert("User have been added successfully.");
        window.location.reload();
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
        <h4>ADD USER</h4>
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
        <Button text="Add User" onClick={onSubmit} />
      </div>
      <div>
        <Side />
      </div>
    </div>
  );
};

export default AddUser;
