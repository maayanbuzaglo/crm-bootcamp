import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import UsersTable from "./UsersTable";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import SlidingPane from "react-sliding-pane";
import styles from "./Users.module.scss";

const Users = () => {
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [form, setForm] = useState({
    first_name: {
      value: "",
    },
    last_name: {
      value: "",
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
    account_token: {
      value: "",
    },
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isInvalid: false },
    });
  };

  const onSubmit = () => {
    const formattedForm = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      phone: form.phone.value,
      account_token: window.localStorage.getItem("user_token"),
    };
    axios
      .post("http://localhost:8005/users", { form: formattedForm })
      .then(function (response) {
        setState({ isPaneOpenLeft: false });
        window.location.reload();
      })
      .catch(function (error) {
        //All the invalid data
        const invalid = error.response.data.invalidInput;
        if (!invalid) {
          setForm((prevForm) => ({
            ...prevForm,
            email: {
              value: prevForm["email"].value,
              isExist: true,
            },
          }));
        } else {
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
      });
  };

  return (
    <div>
      <NavBar />
      <div className={styles.body}>
        <div className={styles.content}>
          <h7 onClick={() => setState({ isPaneOpenLeft: true })}>+</h7>
          <UsersTable />
        </div>
        <div>
          <SlidingPane
            closeIcon={<h4>Close</h4>}
            isOpen={state.isPaneOpenLeft}
            from="right"
            width="400px"
            onRequestClose={() => setState({ isPaneOpenLeft: false })}
          >
            <div className={styles.users}>
              <h4>ADD USER</h4>
              <Input
                placeholder="First name"
                type="text"
                value={form.first_name.value}
                name={"first_name"}
                onChange={onChange}
              />
              <Input
                placeholder="Last name"
                type="text"
                value={form.last_name.value}
                name={"last_name"}
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
              <Button text="Add User" onClick={onSubmit} />
            </div>
          </SlidingPane>
        </div>
      </div>
    </div>
  );
};

export default Users;
