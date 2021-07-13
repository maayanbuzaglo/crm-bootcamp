import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Button from "../Button/Button";
import SideBoardingOrders from "./SideBoardingOrders";
import NavBar from "../NavBar/NavBar";
import axios from "axios";

const Orders = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [products, setProducts] = useState();
  const [client, setClient] = useState();
  const [user, setUser] = useState();
  const [date, setDate] = useState(new Date());

  //Select style.
  const animatedComponents = makeAnimated();
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "#0884d6",
      padding: 20,
      fontFamily: "Optima",
    }),
    control: () => ({
      maxWidth: "250px",
      width: "250px",
      fontFamily: "Optima",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
  };

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
        date: date,
        account_id: window.localStorage.getItem("account_id"),
      };
      axios
        .post("http://localhost:9991//orders/addOrder/", {
          form: formattedForm,
        })
        .then(function (response) {})
        .catch(function () {});
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
          <Select
            placeholder="Menu"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={menu}
            selected={products}
            onChange={(products) => setProducts(products)}
            styles={customStyles}
          />
          <Select
            placeholder="Client"
            components={animatedComponents}
            options={clients}
            selected={client}
            onChange={(client) => setClient(client)}
            styles={customStyles}
          />
          <Select
            placeholder="Delivery person"
            components={animatedComponents}
            options={users}
            selected={user}
            onChange={(user) => setUser(user)}
            styles={customStyles}
          />
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat={"dd-MM-yyyy"}
          />
          <h5 className="invalid">{isInvalid ? "Invalid order." : ""}</h5>
          <Button type="reset" text="Add Order" onClick={addOrder} />
        </div>
        <div>
          <SideBoardingOrders />
        </div>
      </div>
    </div>
  );
};

export default Orders;
