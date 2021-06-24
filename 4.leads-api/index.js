const express = require("express");
const cors = require("cors");
const helpers = require("./helpers");

const bodyParser = require("body-parser");

//mySQL connection.
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "crm",
});

connection.connect();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  const firstName = req.body.firstName; //First name
  const lastName = req.body.lastName; //Last name
  const phoneNumber = req.body.phone; //Phone number
  const emailInput = req.body.email; //Email address

  const invalidInputs = helpers.validateInputs(phoneNumber, emailInput);

  //if all inputs are valid - insert to mySQL table.
  if (invalidInputs.length === 0) {
    connection.query(
      `INSERT INTO leads (first_name, last_name, phone_number, email_address) VALUES ("${firstName}", "${lastName}", "${phoneNumber}", "${emailInput}")`,
      function (error, results, fields) {
        if (error) console.log(error);
      }
    );
    res.status(200).send("Valid inputs");
  }
  //else - return error with the invalid inputs.
  else {
    res.status(500).json({
      msg: "Error creating",
      invalidInput: invalidInputs,
    });
  }
});

app.post("/getAllLeads", function (req, res) {
  const { sorted_column, isDesc } = req.body;
  const query = `SELECT * from leads ORDER BY ${sorted_column || "id"} ${
    isDesc ? "DESC" : "ASC"
  }`;
  console.log(query);
  connection.query(query, function (error, results, fields) {
    if (results) res.json(results);
    if (error) res.status(500).send("error");
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
