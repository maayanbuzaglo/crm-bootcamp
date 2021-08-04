import React from "react";
import styles from "./Input.module.scss";

const Input = ({
  onChange,
  onKeyPress,
  onKeyDown,
  onClick,
  placeholder,
  value,
  name,
  text,
  isInvalid,
  textExist,
  isExist,
  extraStyle,
}) => {
  return (
    <div className={styles.invalidInput}>
      <input
        className={styles.input}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        onClick={onClick}
        type={name}
        placeholder={placeholder}
        name={name}
        value={value}
        autoComplete={"off"}
        style={extraStyle}
      />

      <h5 className={styles.invalid} name={placeholder}>
        {isInvalid && text}
        {isExist && textExist}
      </h5>
    </div>
  );
};

export default Input;
