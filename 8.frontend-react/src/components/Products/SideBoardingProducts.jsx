import React, { useMemo } from "react";
import Table from "../Table/Table";
import styles from "./SideBoardingProducts.module.scss";

const SideBoardingProducts = ({ data }) => {
  const product_type = new URLSearchParams(window.location.search).get(
    "productType"
  );

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
      <div className={styles.sideProduct}></div>
    </div>
  );
};

export default SideBoardingProducts;
