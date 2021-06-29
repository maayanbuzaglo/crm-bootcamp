import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./styles/styles.scss";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/signUp" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/resetPassword" component={ResetPassword} />
        <PrivateRoute path="/homePage" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
