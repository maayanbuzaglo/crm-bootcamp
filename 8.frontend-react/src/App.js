import "./App.css";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/8.frontend-react/src/components/NavBar/NavBar.jsx";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./styles/styles.scss";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
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
