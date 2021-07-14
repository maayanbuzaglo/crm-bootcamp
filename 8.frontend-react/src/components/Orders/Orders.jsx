import React, { useState, useEffect } from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Button from "../Button/Button";
import SideBoardingOrders from "./SideBoardingOrders";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import styles from "./Orders.module.scss";

const Orders = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [products, setProducts] = useState();
  const [client, setClient] = useState();
  const [user, setUser] = useState();
  const [data, setData] = useState([]);

  const [selectedDate, handleDateChange] = useState(new Date());

  const fetchAllOrders = () => {
    const account_id = window.localStorage.getItem("account_id");
    axios
      .post("http://localhost:9991//orders/getOrders/", { account_id })
      .then((result) => {
        setData(result.data.orders);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  //Select style.
  const animatedComponents = makeAnimated();
  const customStyles = {
    container: (styles) => ({
      ...styles,
      width: "100%",
    }),
  };

  const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: blueGrey,
    },
  });

  //Gets the menu options for the order.
  const [menu, setMenu] = useState();

  useEffect(() => {
    (async () => {
      setIsInvalid(false);
      const account_id = window.localStorage.getItem("account_id");
      axios
        .post("http://localhost:9991//orders/getMenu/", { account_id })
        .then((result) => {
          setMenu(
            result.data.menu.map((product) => ({
              value: product.id,
              label: product.product_name,
            }))
          );
        })
        .catch((err) => {});
    })();
  }, [products]);

  //Gets the clients options for the order.
  const [clients, setClients] = useState();

  useEffect(() => {
    (async () => {
      setIsInvalid(false);
      const account_id = window.localStorage.getItem("account_id");
      axios
        .post("http://localhost:9991//clients/getClients/", { account_id })
        .then((result) => {
          setClients(
            result.data.clients.map((client) => ({
              value: client.id,
              label:
                client.first_name.toUpperCase() +
                " " +
                client.last_name.toUpperCase(),
            }))
          );
        })
        .catch((err) => {});
    })();
  }, [client]);

  //Gets the users options for the order.
  const [users, setUsers] = useState();

  useEffect(() => {
    (async () => {
      setIsInvalid(false);
      const account_id = window.localStorage.getItem("account_id");
      axios
        .post("http://localhost:9991//users/getDeliveryPersons/", {
          account_id,
        })
        .then((result) => {
          setUsers(
            result.data.deliveryPersons.map((user) => ({
              value: user.id,
              label:
                user.first_name.toUpperCase() +
                " " +
                user.last_name.toUpperCase(),
            }))
          );
        })
        .catch((err) => {});
    })();
  }, [user]);

  const addOrder = () => {
    if (client && user && products) {
      setIsInvalid(false);
      const formattedForm = {
        products: products,
        client_id: client.value,
        delivery_person_id: user.value,
        date: selectedDate,
        account_id: window.localStorage.getItem("account_id"),
      };
      axios
        .post("http://localhost:9991//orders/addOrder/", {
          form: formattedForm,
        })
        .then(function (response) {
          fetchAllOrders();
          setProducts([]);
          setClient("");
          setUser("");
          handleDateChange(new Date());
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="body">
        <div className="sign-up">
          <h4>ADD ORDER</h4>
          <div className={styles.inputsWrapper}>
            <Select
              placeholder="Menu"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              value={products}
              options={menu}
              onChange={(products) => setProducts(products)}
              styles={customStyles}
            />
            <Select
              placeholder="Client"
              components={animatedComponents}
              value={client}
              options={clients}
              onChange={(client) => setClient(client)}
              styles={customStyles}
            />
            <Select
              placeholder="Delivery person"
              components={animatedComponents}
              value={user}
              options={users}
              onChange={(user) => setUser(user)}
              styles={customStyles}
            />
            <ThemeProvider theme={defaultMaterialTheme}>
              <KeyboardDateTimePicker
                className={styles.inputsWrapper}
                InputProps={{
                  disableUnderline: true,
                }}
                value={selectedDate}
                onChange={(selectedDate) => handleDateChange(selectedDate)}
                onError={console.log}
                minDate={new Date()}
                format="  dd/MM/yyyy   HH:mm"
              />
            </ThemeProvider>
          </div>
          <h5 className="invalid">{isInvalid ? "Invalid order." : ""}</h5>
          <Button type="reset" text="Add Order" onClick={addOrder} />
        </div>
        <div>
          <SideBoardingOrders data={data} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
