import React, { useState, useEffect } from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Button from "../Button/Button";
import OrdersTable from "./OrdersTable";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import SlidingPane from "react-sliding-pane";
import calendar from "../../styles/img/calendar.svg";
import "react-sliding-pane/dist/react-sliding-pane.css";
import styles from "./Orders.module.scss";

const Orders = () => {
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
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
    control: (base, state) => ({
      ...base,
      boxShadow: state.isFocused ? 0 : 0,
      borderColor: state.isFocused ? "black" : "lightBlue",
      "&:hover": {
        borderColor: state.isFocused ? "grey" : "grey",
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      color: "grey",
      padding: 10,
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
          const data = result.data.clients;
          setClients(
            data.map((client) => ({
              value: client.id,
              label:
                client.first_name.charAt(0).toUpperCase() +
                client.first_name.slice(1) +
                " " +
                client.last_name.charAt(0).toUpperCase() +
                client.last_name.slice(1),
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
          const data = result.data.deliveryPersons;
          setUsers(
            data.map((user) => ({
              value: user.id,
              label:
                user.first_name.charAt(0).toUpperCase() +
                user.first_name.slice(1) +
                " " +
                user.last_name.charAt(0).toUpperCase() +
                user.last_name.slice(1),
            }))
          );
        })
        .catch((err) => {});
    })();
  }, [user]);

  const addOrder = () => {
    if (client && user && products.length) {
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
          setState({ isPaneOpenLeft: false });
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
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.buttons}>
            <img
              className={styles.img}
              src={calendar}
              alt="calendar"
              style={{
                display: "flex",
                width: "30px",
                cursor: "pointer",
              }}
              onClick={() =>
                (window.location.href = `http://localhost:3000/ordersCalendar`)
              }
            />
            <h6 onClick={() => setState({ isPaneOpenLeft: true })}>+</h6>
          </div>
          <OrdersTable data={data} />
        </div>
        <div>
          <SlidingPane
            closeIcon={<h4>Close</h4>}
            isOpen={state.isPaneOpenLeft}
            from="right"
            width="400px"
            onRequestClose={() => setState({ isPaneOpenLeft: false })}
          >
            <div className={styles.orders}>
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
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 30,
                    colors: {
                      ...theme.colors,
                      primary25: "AliceBlue",
                      primary: "lightBlue",
                    },
                  })}
                />
                <Select
                  placeholder="Client"
                  components={animatedComponents}
                  value={client}
                  options={clients}
                  onChange={(client) => setClient(client)}
                  styles={customStyles}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 30,
                    colors: {
                      ...theme.colors,
                      primary25: "AliceBlue",
                      primary: "lightBlue",
                    },
                  })}
                />
                <Select
                  placeholder="Delivery person"
                  components={animatedComponents}
                  value={user}
                  options={users}
                  onChange={(user) => setUser(user)}
                  styles={customStyles}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 30,
                    colors: {
                      ...theme.colors,
                      primary25: "AliceBlue",
                      primary: "lightBlue",
                    },
                  })}
                />
                <ThemeProvider theme={defaultMaterialTheme}>
                  <KeyboardDateTimePicker
                    className={styles.input}
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
              <h5 className={styles.invalid}>
                {isInvalid ? "Invalid order." : ""}
              </h5>
              <Button type="reset" text="Add Order" onClick={addOrder} />
            </div>
          </SlidingPane>
        </div>
      </div>
    </div>
  );
};

export default Orders;
