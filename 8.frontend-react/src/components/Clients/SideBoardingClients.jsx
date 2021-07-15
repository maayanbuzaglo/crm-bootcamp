import React, { useMemo } from "react";
import Table from "../Table/Table";
import styles from "./SideBoardingClients.module.scss";

const SideBoardingClients = ({ data }) => {
  const update = (row) => {
    const client_id = row.original.id;
    window.location.href = `http://localhost:3000/updateClient?id=${client_id}`;
  };

  const columns = useMemo(
    () => [
      {
        Header: "First name",
        accessor: "first_name",
      },
      {
        Header: "Last name",
        accessor: "last_name",
      },
      {
        Header: "Phone number",
        accessor: "phone_number",
      },
      {
        Header: "Email address",
        accessor: "email_address",
      },
      {
        Header: "Address",
        accessor: "address",
      },
    ],
    []
  );

  return (
    <div>
      <Table columns={columns} data={data} onClick={(row) => update(row)} />
      <div className={styles.sideClient}></div>
    </div>
  );
};

export default SideBoardingClients;
