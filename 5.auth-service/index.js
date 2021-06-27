const express = require("express");
const cors = require("cors");
const helpers = require("./helpers");
const md5 = require("js-md5");
const bodyParser = require("body-parser");

//Secret token to sign the JWT token.
const accessTokenSecret = "ab4rf5gt7yh2";

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

//Gets the users page - only visible to authenticated users.
app.get("/team", helpers.authenticateJWT, function (req, res) {
  res.json("Get req succeeded");
  // res.json(users);
});

app.post("/login", function (req, res) {
  const emailInput = req.body.form.email;
  password = req.body.form.password;

  connection.query(
    `SELECT password, id FROM accounts WHERE email_address="${emailInput}"`,
    function (error, results, fields) {
      if (error) console.log(error);
      //If email not exist in the data base.
      else if (!results[0]) {
        res.send(400, { errors: "email" });
      }
      //If the password is incorrect.
      else if (results[0].password !== md5(password)) {
        res.send(400, { errors: "password" });
      }
      //If all details is correct.
      else {
        const accessToken = jwt.sign(
          { username: emailInput, user_id: results[0].id },
          accessTokenSecret
        );

        return res.cookie("jwt", accessToken).json({
          accessToken,
        });
      }
    }
  );
});

app.post("/", function (req, res) {
  const firstName = req.body.form.first_name;
  const lastName = req.body.form.last_name;
  const phoneNumber = req.body.form.phone;
  const emailInput = req.body.form.email;
  password = req.body.form.password;

  const invalidInputs = helpers.validateInputs(
    phoneNumber,
    emailInput,
    password
  );

  password = md5(password);

  //if all inputs are valid - insert to mySQL table.
  if (invalidInputs.length === 0) {
    connection.query(
      `INSERT INTO accounts (first_name, last_name, phone_number, email_address, password) VALUES ("${firstName}", "${lastName}", "${phoneNumber}", "${emailInput}", "${password}")`,
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

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
