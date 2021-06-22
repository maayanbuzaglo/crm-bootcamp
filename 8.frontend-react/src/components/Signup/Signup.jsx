import React from "react";
import Input from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/Input/Input.jsx";
import Button from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/Button/Button.jsx";

const SignUp = () => {
  return (
    <div>
      <Input value="Full name" type="text" />
      <Input value="Phone number" type="phone" />
      <Input value="Email address" type="email" />
      <Input value="Password" type="password" />
      <Button text="Sign Up" />
    </div>
  );
};

export default SignUp;
