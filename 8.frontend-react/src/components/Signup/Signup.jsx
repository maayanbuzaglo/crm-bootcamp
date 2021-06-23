import React, { useState } from "react";
import Input from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/Input/Input.jsx";
import Button from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/Button/Button.jsx";
import Side from "./Side";
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
    phone: {
      value: "",
      isInvalid: false,
    },
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
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
    };
    axios
      .post("http://localhost:8005/", { form: formattedForm })
      .then(function (response) {
        alert("We sent the details to your email \n Have a nice day :)");
        window.location.reload();
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
          placeholder="Phone number"
          type="phone"
          value={form.phone.value}
          name={"phone"}
          isInvalid={form.phone.isInvalid}
          onChange={onChange}
        />
        <Input
          placeholder="Email address"
          type="email"
          value={form.email.value}
          name={"email"}
          isInvalid={form.email.isInvalid}
          onChange={onChange}
        />
        <Input
          placeholder="Password"
          type="password"
          value={form.password.value}
          name={"password"}
          isInvalid={form.password.isInvalid}
          onChange={onChange}
        />
        <Button placeholder="Sign Up" onClick={onSubmit} />
      </div>
      <div>
        <Side />
      </div>
    </div>
  );
};

export default SignUp;
