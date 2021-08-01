import React, { useMemo } from "react";
import Table from "../Table/Table";
import CssBaseline from "@material-ui/core/CssBaseline";

const OrdersTable = ({ data }) => {
  const update = (row) => {
    const order_id = row.original.id;
    window.location.href = `http://localhost:3000/updateOrder?id=${order_id}&from=orders`;
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
    <>
      <CssBaseline />
      <Table columns={columns} data={data} onClick={(row) => update(row)} />
    </>
  );
};

export default OrdersTable;
