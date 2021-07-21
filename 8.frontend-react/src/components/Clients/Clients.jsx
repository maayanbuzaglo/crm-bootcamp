import React, { useState, useEffect } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import SideBoardingClients from "./SideBoardingClients";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import SlidingPane from "react-sliding-pane";
import styles from "./Clients.module.scss";

const Clients = () => {
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    first_name: {
      value: "",
      isInvalid: false,
    },
    last_name: {
      value: "",
      isInvalid: false,
    },
    phone: {
      value: "",
      isInvalid: false,
    },
    email: {
      value: "",
      isInvalid: false,
      isExist: false,
    },
    address: {
      value: "",
      isInvalid: false,
    },
    account_token: {
      value: "",
    },
  });

  const fetchAllOrders = () => {
    const account_id = window.localStorage.getItem("account_id");
    axios
      .post("http://localhost:9991//clients/getClients/", { account_id })
      .then((result) => {
        setData(result.data.clients);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isInvalid: false },
    });
  };

  const addClient = () => {
    const formattedForm = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      account_id: window.localStorage.getItem("account_id"),
    };
    axios
      .post("http://localhost:9991//clients/addClient/", {
        form: formattedForm,
      })
      .then(function (response) {
        const invalid = response.data; //All the invalid input data.

        if (invalid) {
          //If the client is already exist.
          if (invalid[0] === "exist") {
            setForm((prevForm) => ({
              ...prevForm,
              email: {
                value: prevForm["email"].value,
                isExist: true,
              },
            }));
          } else if (invalid) {
            invalid.forEach((invalidInput) => {
              setForm((prevForm) => ({
                ...prevForm,
                [invalidInput]: {
                  value: prevForm[invalidInput].value,
                  isInvalid: true,
                },
              }));
            });
          }
        }
        if (invalid.length === 0) {
          setState({ isPaneOpenLeft: false });
          fetchAllOrders();
          setForm({
            ...form,
            first_name: { value: "", isInvalid: false },
            last_name: { value: "", isInvalid: false },
            phone: { value: "", isInvalid: false },
            email: { value: "", isInvalid: false },
            address: { value: "", isInvalid: false },
          });
        }
      })
      .catch(function () {});
  };

  return (
    <div>
      <NavBar />
      <div className={styles.body}>
        <div className={styles.content}>
          <h7 onClick={() => setState({ isPaneOpenLeft: true })}>+</h7>
          <SideBoardingClients data={data} />
        </div>
        <div>
          <SlidingPane
            closeIcon={<h4>Close</h4>}
            isOpen={state.isPaneOpenLeft}
            from="right"
            width="400px"
            onRequestClose={() => setState({ isPaneOpenLeft: false })}
          >
            <div className={styles.clients}>
              <h4>ADD CLIENT</h4>
              <Input
                placeholder="First name"
                type="text"
                value={form.first_name.value}
                name={"first_name"}
                isInvalid={form.first_name.isInvalid}
                text={form.first_name.value ? null : "First name is required."}
                onChange={onChange}
              />
              <Input
                placeholder="Last name"
                type="text"
                value={form.last_name.value}
                name={"last_name"}
                isInvalid={form.last_name.isInvalid}
                text={form.last_name.value ? null : "Last name is required."}
                onChange={onChange}
              />
              <Input
                placeholder="Phone number"
                type="phone"
                value={form.phone.value}
                name={"phone"}
                isInvalid={form.phone.isInvalid}
                text={
                  form.phone.value
                    ? "Invalid phone number."
                    : "A phone number is required."
                }
                onChange={onChange}
              />
              <Input
                placeholder="Email address"
                type="email"
                value={form.email.value}
                name={"email"}
                isExist={form.email.isExist}
                textExist={"Account already exists"}
                isInvalid={form.email.isInvalid}
                text={
                  form.email.value
                    ? "Invalid email address."
                    : "An email address is required."
                }
                onChange={onChange}
              />
              <Input
                placeholder="Address"
                type="address"
                value={form.address.value}
                name={"address"}
                isInvalid={form.address.isInvalid}
                text={form.address.value ? null : "An address is required."}
                onChange={onChange}
              />
              <Button text="Add Client" onClick={addClient} />
            </div>
          </SlidingPane>
        </div>
      </div>
    </div>
  );
};

export default Clients;
