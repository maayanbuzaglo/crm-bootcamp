import HomePage from "./components/HomePage/HomePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import AddUser from "./components/AddUser/AddUser";
import Clients from "./components/Clients/Clients";
import UpdateClient from "./components/Clients/UpdateClient";
import Products from "./components/Products/Products";
import ProductsTypes from "./components/Products/ProductsTypes";
import UpdateProduct from "./components/Products/UpdateProduct";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./styles/styles.scss";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signUp" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/resetPassword" component={ResetPassword} />
        <Route path="/addUser" component={AddUser} />
        <Route path="/clients" component={Clients} />
        <Route path="/updateClient" component={UpdateClient} />
        <Route path="/products" component={Products} />
        <Route path="/productsTypes" component={ProductsTypes} />
        <Route path="/updateProduct" component={UpdateProduct} />
        <PrivateRoute path="/homePage" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
