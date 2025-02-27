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
import OrdersCalendar from "./components/OrdersCalendar/OrdersCalendar";
import DeliveriesDetails from "./components/DeliveriesDetails/DeliveriesDetails";
import Chat from "./components/Chat/Chat";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./styles/_base.scss";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";

function App() {
  useEffect(() => {
    const accountToken = window.localStorage.user_token;
    axios
      .post("http://localhost:8005/userToken", { accountToken })
      .then(function (response) {
        const userDetails = response.data;

        window.addEventListener("click", (event) => {
          axios.post("http://localhost:3200/api/v1/domEvents", {
            user_email: userDetails.username,
            user_id: userDetails.user_id,
            account_id: userDetails.account_id,
            event_type: "click",
            class_id_name: event.target.className,
            // ? event.target.className.split("_")[0]
            // : event.target.id.split("_")[0],
            time: moment(new Date()).format("yyyy-MM-DD HH:mm:ss"),
          });
        });
      });
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
          <Route path="/ordersCalendar" component={OrdersCalendar} />
          <PrivateRoute
            path="/deliveriesDetails"
            component={DeliveriesDetails}
          />
          <PrivateRoute path="/homePage" component={HomePage} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  );
}

export default App;
