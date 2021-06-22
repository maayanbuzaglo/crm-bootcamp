import React from "react";

const Input = (props) => {
  return (
    <div>
      <input type="text" placeholder={props.value}></input>
    </div>
  );
};

export default Input;
