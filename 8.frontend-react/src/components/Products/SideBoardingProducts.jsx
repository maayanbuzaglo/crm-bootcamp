import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table/Table";
import axios from "axios";
import "./SideBoardingProducts.modules.scss";

const SideBoardingProducts = () => {
  const product_type = new URLSearchParams(window.location.search).get(
    "productType"
  );
  const [data, setData] = useState([]);

  //Using useEffect to call the API once mounted and set the data.
  useEffect(() => {
    (async () => {
      const account_id = window.localStorage.getItem("account_id");
      axios
        .post("http://localhost:9991//products/getProducts/", {
          account_id,
          product_type,
        })
        .then((result) => {
          // console.log(result);
          setData(result.data.products);
        })
        .catch((err) => {});
    })();
  }, [product_type]);

  const update = (row) => {
    const product_id = row.original.id;
    window.location.href = `http://localhost:3000/updateProduct?id=${product_id}&productType=${product_type}`;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Product",
        accessor: "product_name",
      },
      {
        Header: "Price",
        accessor: "product_price",
      },
    ],
    []
  );

  return (
    <div>
      <Table columns={columns} data={data} onClick={(row) => update(row)} />
      <div className="sideClient"></div>
    </div>
  );
};

export default SideBoardingProducts;
