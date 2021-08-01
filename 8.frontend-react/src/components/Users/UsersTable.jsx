import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table/Table";
import Button from "../Button/Button";
import ConfirmAlert from "../ConfirmAlert/ConfirmAlert";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";

const UsersTable = () => {
  const [data, setData] = useState([]);
  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const account_token = window.localStorage.getItem("user_token");
      axios
        .get("http://localhost:8005/team", {
          headers: {
            authorization: "Bearer " + account_token,
          },
        })
        .then((result) => {
          setData(result.data);
        })
        .catch((err) => {});
    })();
  }, []);

  const onDelete = (id) => {
    axios
      .post("http://localhost:8005/deleteUser", { id: id })
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {});
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
        Header: "User type",
        accessor: "type",
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
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "",
        accessor: "id",
        Cell: ({ row }) => (
          <ConfirmAlert
            onClick={(e) => onDelete(row.original.id)}
            title="Delete this user?"
            text="Delete"
          />
        ),
      },
    ],
    []
  );

  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={data} onClick={() => ""} />
    </div>
  );
};

export default UsersTable;
