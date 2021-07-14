import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table/Table";
import axios from "axios";
import styles from "./SideBoardingClients.module.scss";

const SideBoardingClients = () => {
  const [data, setData] = useState([]);

  //Using useEffect to call the API once mounted and set the data.
  useEffect(() => {
    (async () => {
      const account_id = window.localStorage.getItem("account_id");
      axios
        .post("http://localhost:9991//clients/getClients/", { account_id })
        .then((result) => {
          setData(result.data.clients);
        })
        .catch((err) => {});
    })();
  }, []);

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
