import React, { useState, useEffect } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ProductsTable from "./ProductsTable";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import SlidingPane from "react-sliding-pane";
import styles from "./Products.module.scss";

const Products = () => {
  const product_type = new URLSearchParams(window.location.search).get(
    "productType"
  );
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [data, setData] = useState([]);

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

  const fetchAllProducts = () => {
    const account_id = window.localStorage.getItem("account_id");
    axios
      .post("http://localhost:9991//products/getProducts/", {
        account_id,
        product_type,
      })
      .then((result) => {
        setData(result.data.products);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const account_id = window.localStorage.getItem("account_id");
    axios
      .post("http://localhost:9991//products/getProducts/", {
        account_id,
        product_type,
      })
      .then((result) => {
        setData(result.data.products);
      })
      .catch((err) => {});
  }, [product_type]);

  const onChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: { value: e.target.value, isInvalid: false },
    });
  };

  const addProduct = () => {
    if (!form.product_name.value) {
      setForm({
        ...form,
        product_name: { value: form.product_name.value, isInvalid: true },
      });
    } else if (!form.product_price.value) {
      setForm({
        ...form,
        product_price: { value: form.product_price.value, isInvalid: true },
      });
    } else {
      if (form.product_name.value && form.product_price.value) {
        const formattedForm = {
          product_name: form.product_name.value,
          product_price: form.product_price.value,
          product_type: product_type,
          account_id: window.localStorage.getItem("account_id"),
        };
        axios
          .post("http://localhost:9991//products/addProduct/", {
            form: formattedForm,
          })
          .then(function (response) {
            fetchAllProducts();
            setState({ isPaneOpenLeft: false });
            setForm({
              ...form,
              product_name: { value: "", isInvalid: false },
              product_price: { value: "", isInvalid: false },
            });
          })
          .catch(function () {});
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className={styles.body}>
        <div className={styles.content}>
          <h6 onClick={() => setState({ isPaneOpenLeft: true })}>+</h6>
          <ProductsTable data={data} />
        </div>
        <div>
          <div>
            <SlidingPane
              closeIcon={<h4>Close</h4>}
              isOpen={state.isPaneOpenLeft}
              from="right"
              width="400px"
              onRequestClose={() => setState({ isPaneOpenLeft: false })}
            >
              <div className={styles.products}>
                <h4>ADD {product_type.toUpperCase()}</h4>
                <Input
                  placeholder="Product name"
                  type="text"
                  value={form.product_name.value}
                  name={"product_name"}
                  isInvalid={form.product_name.isInvalid}
                  text={
                    form.product_name.value ? null : "Product name is required."
                  }
                  onChange={onChange}
                />
                <Input
                  placeholder="Product price"
                  type="text"
                  value={form.product_price.value}
                  name={"product_price"}
                  isInvalid={form.product_price.isInvalid}
                  text={
                    form.product_price.value
                      ? null
                      : "Product price is required."
                  }
                  onChange={onChange}
                />
                <Button text={`Add ${product_type}`} onClick={addProduct} />
              </div>
            </SlidingPane>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
