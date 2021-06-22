import React from 'react';
import { Link } from "react-router-dom";

const Login = ({}) => {
    return (
        <div>
        <div>
                        <button>
              <Link to="/homePage">Home</Link>
            </button>
        </div>
        <div>
            this is the login page
        </div>
        </div>
    )
}

export default Login;