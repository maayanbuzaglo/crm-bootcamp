import React, { useState, useEffect } from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Button from "../Button/Button";
import NavBar from "../NavBar/NavBar";
import ConfirmAlert from "../ConfirmAlert/ConfirmAlert";
import axios from "axios";
import styles from "./UpdateOrder.module.scss";

const UpdateOrder = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const from = new URLSearchParams(window.location.search).get("from");

  const [isInvalid, setIsInvalid] = useState(false);
  const [status, setStatus] = useState(false);
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
      minWidth: "218px",
      maxWidth: "218px",
      marginBottom: "10%",
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
            label:
              data[0].client_name.split(" ")[0].charAt(0).toUpperCase() +
              data[0].client_name.split(" ")[0].slice(1) +
              " " +
              data[0].client_name.split(" ")[1].charAt(0).toUpperCase() +
              data[0].client_name.split(" ")[1].slice(1),
          });

          setUser({
            value: data[0].user_id,
            label:
              data[0].user_name.split(" ")[0].charAt(0).toUpperCase() +
              data[0].user_name.split(" ")[0].slice(1) +
              " " +
              data[0].user_name.split(" ")[1].charAt(0).toUpperCase() +
              data[0].user_name.split(" ")[1].slice(1),
          });

          setStatus(data[0].status);
          handleDateChange(new Date(data[0].date));
        })
        .catch((err) => {});
    })();
  }, [id]);

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
  }, []);

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
  }, []);

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
  }, []);

  const onSubmit = () => {
    if (client && user && products.length) {
      setIsInvalid(false);
      document.getElementById("paid").checked === true
        ? setStatus(1)
        : setStatus(0);
      const formattedForm = {
        products: products,
        client_id: client.value,
        delivery_person_id: user.value,
        date: selectedDate,
        id: id,
        status: status,
      };
      axios
        .post("http://localhost:9991//orders/updateOrder/", {
          form: formattedForm,
        })
        .then(function (response) {
          window.location.href = `http://localhost:3000/${from}`;
        })
        .catch(function () {});
    } else {
      setIsInvalid(true);
    }
  };

  const onDelete = () => {
    axios
      .post("http://localhost:9991//orders/removeOrder/", { id: id })
      .then(function (response) {
        window.location.href = `http://localhost:3000/${from}`;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className={styles.body}>
        <div className={styles.updateOrder}>
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
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="paid"
                checked={Number(status) === 1 ? true : false}
                onClick={() => {
                  setStatus(1 - status);
                }}
              />
              <label for="scales">Paid</label>
            </div>
            <h5 className={styles.invalid}>
              {isInvalid ? "Invalid order." : ""}
            </h5>
          </div>
          <Button text="Update Order" onClick={onSubmit} />
          <ConfirmAlert
            onClick={onDelete}
            title="Delete this order?"
            text="Delete Order"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
