import React from "react";
import { Link } from "react-router-dom";

const SignUp = ({}) => {
  return (
    <div>
      <div>
        <button>
          <Link to="/homePage">Home</Link>
        </button>
      </div>
      <div>this is the SignUp page</div>
    </div>
  );
};

export default SignUp;
