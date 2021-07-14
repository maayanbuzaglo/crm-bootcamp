import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table/Table";

const SideBoardingOrders = ({ data }) => {
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
