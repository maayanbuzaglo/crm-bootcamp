import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import SideBoardingProducts from "./SideBoardingProducts";
import NavBar from "../NavBar/NavBar";
import axios from "axios";

const Products = () => {
  const productType = new URLSearchParams(window.location.search).get(
    "productType"
  );

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

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isInvalid: false },
    });
  };

  const addProduct = () => {
    const formattedForm = {
      product_name: form.product_name.value,
      product_price: form.product_price.value,
      product_type: productType,
      account_id: window.localStorage.getItem("account_id"),
    };
    axios
      .post("http://localhost:9991//products/addProduct/", {
        form: formattedForm,
      })
      .then(function (response) {
        window.location.reload();
      })
      .catch(function () {});
  };

  return (
    <div>
      <NavBar />
      <div className="body">
        <div className="sign-up">
          <h4>ADD {productType.toUpperCase()}</h4>
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
          <Button text={`Add ${productType}`} onClick={addProduct} />
        </div>
        <div>
          <SideBoardingProducts />
        </div>
      </div>
    </div>
  );
};

export default Products;
