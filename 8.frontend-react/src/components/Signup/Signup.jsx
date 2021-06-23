import React, { useState } from "react";
import Input from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/Input/Input.jsx";
import Button from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/Button/Button.jsx";
import Side from "./Side";

const SignUp = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    console.log(form);
  };

  return (
    <div className="body">
      <div className="sign-up">
        <h1>Sign up and start your trial</h1>
        <Input
          placeholder="First name"
          type="text"
          value={form.first_name}
          name={"first_name"}
          onChange={onChange}
        />
        <Input
          placeholder="Last name"
          type="text"
          value={form.last_name}
          name={"last_name"}
          onChange={onChange}
        />
        <Input
          placeholder="Phone number"
          type="phone"
          value={form.phone}
          name={"phone"}
          onChange={onChange}
        />
        <Input
          placeholder="Email address"
          type="email"
          value={form.email}
          name={"email"}
          onChange={onChange}
        />
        <Input
          placeholder="Password"
          type="password"
          value={form.password}
          name={"password"}
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
