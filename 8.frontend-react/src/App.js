import "./App.css";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import HomePage from "./components/HomePage/HomePage";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
