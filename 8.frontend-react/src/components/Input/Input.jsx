import React from "react";

const Input = ({ onChange, placeholder, value, name }) => {
  return (
    <input
      onChange={onChange}
      id="input"
      type="text"
      placeholder={placeholder}
      name={name}
      value={value}
    />
  );
};

export default Input;
