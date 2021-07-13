import HomePage from "./components/HomePage/HomePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Users from "./components/Users/Users";
import Clients from "./components/Clients/Clients";
import UpdateClient from "./components/Clients/UpdateClient";
import Products from "./components/Products/Products";
import ProductsTypes from "./components/Products/ProductsTypes";
import UpdateProduct from "./components/Products/UpdateProduct";
import Orders from "./components/Orders/Orders";
import UpdateOrder from "./components/Orders/UpdateOrder";
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
        <Route path="/users" component={Users} />
        <Route path="/clients" component={Clients} />
        <Route path="/updateClient" component={UpdateClient} />
        <Route path="/products" component={Products} />
        <Route path="/productsTypes" component={ProductsTypes} />
        <Route path="/updateProduct" component={UpdateProduct} />
        <Route path="/orders" component={Orders} />
        <Route path="/updateOrder" component={UpdateOrder} />
        <PrivateRoute path="/homePage" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
