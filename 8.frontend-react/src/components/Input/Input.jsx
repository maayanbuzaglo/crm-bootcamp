import React from "react";
import "./Input.module.scss";

const Input = ({
  onChange,
  onClick,
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
        onClick={onClick}
        type={name}
        placeholder={placeholder}
        name={name}
        value={value}
        autoComplete={"off"}
      />

      <h5 className="invalid" name={placeholder}>
        {isInvalid && text}
        {isExist && textExist}
      </h5>
    </div>
  );
};

export default Input;
