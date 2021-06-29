import React, { useEffect } from "react";

const LoadingSpinner = ({ validToken }) => {
  useEffect(() => {
    validToken();
  }, []);

  return (
    <div className="loading">
      <h1>This page is not valid</h1>
    </div>
  );
};

export default LoadingSpinner;
