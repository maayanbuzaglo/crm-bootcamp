import React, { useState, useEffect } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import NavBar from "../NavBar/NavBar";
import ConfirmAlert from "../ConfirmAlert/ConfirmAlert";
import axios from "axios";
import styles from "./UpdateClient.module.scss";

const UpdateClient = () => {
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
      // isExist: false,
    },
    address: {
      value: "",
      isInvalid: false,
    },
    account_token: {
      value: "",
    },
  });
  const id = new URLSearchParams(window.location.search).get("id");

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      await axios
        .post("http://localhost:9991//clients/getClient/", { id: id })
        .then((result) => {
          const data = result.data.client;
          setForm((prevForm) => ({
            ...prevForm,
            first_name: {
              value: data[0].first_name,
            },
            last_name: {
              value: data[0].last_name,
            },
            phone: {
              value: data[0].phone_number,
            },
            email: {
              value: data[0].email_address,
            },
            address: {
              value: data[0].address,
            },
          }));
        })
        .catch((err) => {});
    })();
  }, [id]);

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
      address: form.address.value,
      id: id,
    };
    axios
      .post("http://localhost:9991//clients/updateClient/", {
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
        if (invalid.length === 0)
          window.location.href = "http://localhost:3000/clients";
      })
      .catch(function () {});
  };

  const onDelete = () => {
    axios
      .post("http://localhost:9991//clients/removeClient/", { id: id })
      .then(function (response) {
        window.location.href = "http://localhost:3000/clients";
      })
      .catch(function (error) {});
  };

  return (
    <div>
      <NavBar />
      <div className={styles.updateClient}>
        <h4>UPDATE CLIENT</h4>
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
        <Button text="Update" onClick={onSubmit} />
        <ConfirmAlert
          onClick={onDelete}
          title="Delete this client?"
          text="Delete Client"
        />
      </div>
    </div>
  );
};

export default UpdateClient;
