const express = require("express");
const cors = require("cors");
const helpers = require("./helpers");
const md5 = require("js-md5");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const BlueBird = require("bluebird");

dotenv.config();

//Secret token to sign the JWT token.
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

//mySQL connection.
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "crm",
});

const asyncConnection = BlueBird.promisifyAll(connection);

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
    `SELECT password, id FROM users WHERE email_address="${emailInput}"`,
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

app.post("/forgotPassword", function (req, res) {
  const emailInput = req.body.form.email;

  connection.query(
    `SELECT id, first_name FROM users WHERE email_address="${emailInput}"`,
    function (error, results, fields) {
      if (error) console.log(error);
      //If not exist in the data base.
      else if (!results[0]) {
        res.send(400, { errors: "email" });
      }
      //If email is correct.
      else {
        //For sending the token in the link.
        const accessToken = jwt.sign(
          { user_id: results[0].id },
          accessTokenSecret
        );
        connection.query(
          `UPDATE users SET reset_token="${accessToken}" WHERE email_address="${emailInput}"`
        );
        const from = "maayan.bzg@gmail.com";
        const to = emailInput;
        const subject = "Reset password";
        const html =
          "http://localhost:3000/resetPassword?accessToken=" + accessToken;
        try {
          helpers.sendEmail(from, to, subject, html);
          res.json({ email: to });
        } catch {
          console.log("got an error: ", err);
          res.json({ error: err });
        }
      }
    }
  );
});

app.post("/resetPassword", function (req, res) {
  password = req.body.form.password;
  id = req.body.form.id;
  console.log(id);

  const invalidInputs = helpers.validateInputs(null, null, password);

  password = md5(password);

  //if all inputs are valid - insert to mySQL table.
  if (invalidInputs.length === 0) {
    connection.query(
      `UPDATE users SET password="${password}", status="${1}", reset_token=null WHERE id="${id}"`,
      function (error, results, fields) {
        if (error) console.log(error);
        console.log(
          `UPDATE users SET password="${password}", status="${1}", reset_token=null WHERE id="${id}"`
        );
      }
    );
    res.status(200).send("Successful");
  }
  //else - return error with the invalid inputs.
  else {
    res.status(500).json({
      msg: "Error creating",
      invalidInput: invalidInputs,
    });
  }
});

app.post("/addUser", async function (req, res) {
  const firstName = req.body.form.first_name;
  const lastName = req.body.form.last_name;
  const phoneNumber = req.body.form.phone;
  const emailAddress = req.body.form.email;
  // const adminId: req.body.form.admin_id;

  let accountId = 0;

  const invalidInputs = helpers.validateInputs(phoneNumber, emailAddress, null);

  //if all inputs are valid - insert to mySQL table.
  if (invalidInputs.length === 0) {
    const accessToken = jwt.sign(
      { emailAddress: emailAddress },
      accessTokenSecret
    );
    try {
      //Insert user to users.
      const results = await asyncConnection.queryAsync(
        `INSERT INTO users (first_name, last_name, phone_number, email_address, reset_token) VALUES ("${firstName}", "${lastName}", "${phoneNumber}", "${emailAddress}", "${accessToken}")`
      );
    } catch (err) {
      res.status(500).send(err.sqlMessage);
      return;
    }
    const from = "maayan.bzg@gmail.com";
    const to = emailAddress;
    const subject = "Sign Up";
    const html =
      "http://localhost:3000/resetPassword?accessToken=" + accessToken;

    try {
      helpers.sendEmail(from, to, subject, html);
    } catch {
      console.log("got an error: ", err);
      res.json({ error: err });
      return;
    }
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

//Sign up server handle
app.post("/", async function (req, res) {
  const firstName = req.body.form.first_name;
  const lastName = req.body.form.last_name;
  const accountName = req.body.form.account_name;
  const phoneNumber = req.body.form.phone;
  const emailAddress = req.body.form.email;
  password = req.body.form.password;

  let accountId = 0;

  const invalidInputs = helpers.validateInputs(
    phoneNumber,
    emailAddress,
    password
  );

  password = md5(password);

  //if all inputs are valid - insert to mySQL table.
  if (invalidInputs.length === 0) {
    //Insert admin to accounts.
    try {
      await asyncConnection.queryAsync(
        `INSERT INTO accounts (account_name, phone_number, email_address) VALUES ("${accountName}", "${phoneNumber}", "${emailAddress}")`
      );
    } catch (err) {
      res.status(500).send(err.sqlMessage);
      return;
    }

    try {
      //Gets the last inserted id.
      const results = await asyncConnection.queryAsync(
        `SELECT id FROM accounts WHERE email_address="${emailAddress}"`
      );
      accountId = results[0].id;
    } catch (err) {
      res.status(500).send(err.sqlMessage);
      return;
    }

    try {
      //Insert admin to users.
      const results = await asyncConnection.queryAsync(
        `INSERT INTO users (first_name, last_name, phone_number, email_address, password, account_id, status) VALUES ("${firstName}", "${lastName}", "${phoneNumber}", "${emailAddress}", "${password}", "${accountId}", ${1})`
      );
    } catch (err) {
      res.status(500).send(err.sqlMessage);
      return;
    }
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

app.get("/resetPassword", async function (req, res) {
  const accessToken = req.query[0];
  await connection.query(
    `SELECT id FROM users WHERE reset_token="${accessToken}"`,
    function (error, results, fields) {
      if (error) res.status(500).send("Access token is not valid");
      else if (results.length > 0) {
        res.json({ id: results[0].id });
      } else res.status(500).send("error");
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
