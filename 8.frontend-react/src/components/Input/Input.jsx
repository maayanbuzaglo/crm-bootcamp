import React from "react";

const Input = ({ onChange, placeholder, value, name, isInvalid }) => {
  return (
    <div className="input-invalid">
      <input
        onChange={onChange}
        type={name}
        placeholder={placeholder}
        name={name}
        value={value}
      />

      <h5 className="invalid" name={placeholder}>
        {isInvalid && "Invalid " + name}
      </h5>
    </div>
  );
};

export default Input;
