import React, { useEffect } from "react";
import "./LoadingSpinner.scss";

const LoadingSpinner = ({ validToken, text, className }) => {
  useEffect(() => {
    validToken();
  }, []);

  return (
    <div className={className}>
      <h1>{text}</h1>
    </div>
  );
};

export default LoadingSpinner;
