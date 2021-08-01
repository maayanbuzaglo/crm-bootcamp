import React, { useMemo } from "react";
import Table from "../Table/Table";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";

const SideBoardingProducts = ({ data }) => {
  const product_type = new URLSearchParams(window.location.search).get(
    "productType"
  );

  //For image upload.
  const fileSelect = (event, id) => {
    const fd = new FormData();
    let imgName = event.target.files[0].name.split(".");
    imgName = imgName[imgName.length - 1];
    fd.append("image", event.target.files[0], `${id}.${imgName}`);
    fd.append("id", id);
    fd.append("imgSrc", `http://localhost:9991/img/${id}.${imgName}`);

    axios
      .post("http://localhost:9991/products/uploadProductImage/", fd)
      .then((res) => {
        window.location.reload();
      });
  };

  const deleteImg = (id) => {
    const r = window.confirm("Are you sure to delete this product image?");
    if (r === true) {
      axios
        .post("http://localhost:9991/products/deleteProductImage/", { id })
        .then((res) => {
          window.location.reload();
        });
    }
  };

  const update = (row) => {
    const product_id = row.original.id;
    window.location.href = `http://localhost:3000/updateProduct?id=${product_id}&productType=${product_type}`;
  };

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "id",
        Cell: ({ row }) =>
          row.original.image ? (
            <img
              src={row.original.image}
              alt="product img"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "16px",
              }}
              onClick={(event) => {
                event.stopPropagation();
                deleteImg(row.original.id);
              }}
            ></img>
          ) : (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => fileSelect(e, row.original.id)}
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          ),
      },
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
      <CssBaseline />
      <Table columns={columns} data={data} onClick={(row) => update(row)} />
    </div>
  );
};

export default SideBoardingProducts;
