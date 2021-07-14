import React, { useState, useEffect } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import "./UpdateProduct.scss";

const UpdateProduct = () => {
  const [form, setForm] = useState({
    product_name: {
      value: "",
      isInvalid: false,
    },
    product_price: {
      value: "",
      isInvalid: false,
    },
    account_token: {
      value: "",
    },
  });
  const id = new URLSearchParams(window.location.search).get("id");
  const productType = new URLSearchParams(window.location.search).get(
    "productType"
  );

  //Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      await axios
        .post("http://localhost:9991//products/getProduct/", { id: id })
        .then((result) => {
          const data = result.data.product;
          setForm((prevForm) => ({
            ...prevForm,
            product_name: {
              value: data[0].product_name,
            },
            product_price: {
              value: data[0].product_price,
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
      product_name: form.product_name.value,
      product_price: form.product_price.value,
      id: id,
    };
    axios
      .post("http://localhost:9991//products/updateProduct/", {
        form: formattedForm,
      })
      .then(function (response) {
        window.location.href = `http://localhost:3000/products?productType=${productType}`;
      })
      .catch(function () {});
  };

  const onDelete = () => {
    axios
      .post("http://localhost:9991//products/removeProduct/", { id: id })
      .then(function (response) {
        window.location.href = `http://localhost:3000/products?productType=${productType}`;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="body">
        <div className="update-client">
          <h4>UPDATE MEAL</h4>
          <Input
            placeholder="Product name"
            type="text"
            value={form.product_name.value}
            name={"product_name"}
            isInvalid={form.product_name.isInvalid}
            text={form.product_name.value ? null : "Product name is required."}
            onChange={onChange}
          />
          <Input
            placeholder="Product price"
            type="text"
            value={form.product_price.value}
            name={"product_price"}
            isInvalid={form.product_price.isInvalid}
            text={
              form.product_price.value ? null : "Product price is required."
            }
            onChange={onChange}
          />
          <Button text="Update Meal" onClick={onSubmit} />
          <h5 onClick={onDelete}>Delete Meal</h5>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
