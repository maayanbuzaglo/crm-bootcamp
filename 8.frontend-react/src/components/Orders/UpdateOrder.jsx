import React, { useState, useEffect } from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Button from "../Button/Button";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import "./UpdateOrder.scss";
import styles from "./Orders.module.scss";

const UpdateOrder = () => {
  const id = new URLSearchParams(window.location.search).get("id");

  const [products, setProducts] = useState();
  const [client, setClient] = useState({
    value: "",
    label: "",
  });
  const [user, setUser] = useState();
  const [selectedDate, handleDateChange] = useState(new Date());

  //Select style.
  const animatedComponents = makeAnimated();
  const customStyles = {
    container: (styles) => ({
      ...styles,
      width: "100%",
    }),
  };

  //Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      await axios
        .post("http://localhost:9991//orders/getOrder/", { id: id })
        .then((result) => {
          const data = result.data.order;

          setProducts(
            data.map((product) => ({
              value: product.product_id,
              label: product.product_name,
            }))
          );

          setClient({
            value: data[0].client_id,
            label: data[0].client_name.toUpperCase(),
          });

          setUser({
            value: data[0].user_id,
            label: data[0].user_name.toUpperCase(),
          });

          handleDateChange(new Date(data[0].date));
        })
        .catch((err) => {});
    })();
  }, []);

  //Gets the menu options for the order.
  const [menu, setMenu] = useState();

  useEffect(() => {
    (async () => {
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
  }, []);

  //Gets the clients options for the order.
  const [clients, setClients] = useState();

  useEffect(() => {
    (async () => {
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
  }, []);

  //Gets the users options for the order.
  const [users, setUsers] = useState();

  useEffect(() => {
    (async () => {
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
  }, []);

  const onSubmit = () => {
    const formattedForm = {
      products: products,
      client_id: client.value,
      delivery_person_id: user.value,
      date: selectedDate,
      id: id,
    };
    console.log(formattedForm);
    axios
      .post("http://localhost:9991//orders/updateOrder/", {
        form: formattedForm,
      })
      .then(function (response) {
        window.location.href = `http://localhost:3000/orders`;
      })
      .catch(function () {});
  };

  const onDelete = () => {
    axios
      .post("http://localhost:9991//orders/removeOrder/", { id: id })
      .then(function (response) {
        window.location.href = `http://localhost:3000/orders`;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="sign-up">
        <h4>UPDATE ORDER</h4>
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
          <form>
            <KeyboardDateTimePicker
              InputProps={{
                disableUnderline: true,
              }}
              style={{ fontFamily: "optima" }}
              value={selectedDate}
              onChange={(date) => handleDateChange(date)}
              onError={console.log}
              minDate={new Date()}
              format="dd/MM/yyyy hh:mm a"
            />
          </form>
        </div>
        <Button text="Update Order" onClick={onSubmit} />
        <h5 onClick={onDelete}>Delete Order</h5>
      </div>
    </div>
  );
};

export default UpdateOrder;
