import React from "react";

const Input = ({
  onChange,
  placeholder,
  value,
  name,
  text,
  isInvalid,
  textExist,
  isExist,
}) => {
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
        {isInvalid && text}
        {isExist && textExist}
      </h5>
    </div>
  );
};

export default Input;
