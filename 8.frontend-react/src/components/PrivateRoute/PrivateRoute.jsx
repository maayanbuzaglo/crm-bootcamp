import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, token, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("user_token") ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/login"} />
        );
      }}
    />
  );
}

export default PrivateRoute;
