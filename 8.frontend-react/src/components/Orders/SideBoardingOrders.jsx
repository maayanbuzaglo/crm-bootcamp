import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table/Table";
import axios from "axios";

const SideBoardingOrders = () => {
  const [data, setData] = useState([]);

  //Using useEffect to call the API once mounted and set the data.
  useEffect(() => {
    (async () => {
      const account_id = window.localStorage.getItem("account_id");
      axios
        .post("http://localhost:9991//orders/getOrders/", { account_id })
        .then((result) => {
          setData(result.data.orders);
        })
        .catch((err) => {});
    })();
  }, [data]);

  const update = (row) => {
    const order_id = row.original.id;
    window.location.href = `http://localhost:3000/updateOrder?id=${order_id}`;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Order id",
        accessor: "id",
      },
      {
        Header: "Client",
        accessor: "client_name",
      },
      {
        Header: "Delivery person",
        accessor: "user_name",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Total",
        accessor: "total_price",
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

export default SideBoardingOrders;
