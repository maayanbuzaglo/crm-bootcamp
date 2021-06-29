const express = require("express");
const cors = require("cors");
const helpers = require("./helpers");
const md5 = require("js-md5");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const MailGun = require("mailgun-js");
const dotenv = require("dotenv");

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

app.post("/forgotPassword", function (req, res) {
  const emailInput = req.body.form.email;

  connection.query(
    `SELECT id, first_name FROM accounts WHERE email_address="${emailInput}"`,
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
          `UPDATE accounts SET reset_token="${accessToken}" WHERE email_address="${emailInput}"`
        );

        const mailGun = new MailGun({
          apiKey: process.env.MAILGUN_KEY,
          domain: process.env.MAILGUN_ADMIN,
        });
        var data = {
          //Specify email data.
          from: "maayan.bzg@gmail.com",
          //The email to contact.
          to: emailInput,
          //Subject and text data.
          subject: "Reset password",
          html:
            "http://localhost:3000/resetPassword?accessToken=" + accessToken,
        };
        //Invokes the method to send emails given the above data with the helper library
        mailGun.messages().send(data, function (err, body) {
          //If there is an error, render the error page
          if (err) {
            res.json({ error: err });
            console.log("got an error: ", err);
          } else {
            res.json({ email: emailInput });
          }
        });
      }
    }
  );
});

app.post("/resetPassword", function (req, res) {
  password = req.body.form.password;

  const invalidInputs = helpers.validateInputs(null, null, password);

  password = md5(password);

  //if all inputs are valid - insert to mySQL table.
  if (invalidInputs.length === 0) {
    connection.query(
      `UPDATE accounts SET password = "${password}" WHERE id=1`,
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

//Sign up server handle
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

app.get("/resetPassword", async function (req, res) {
  const accessToken = req.query[0];
  await connection.query(
    `SELECT id FROM accounts WHERE reset_token="${accessToken}"`,
    function (error, results, fields) {
      if (error) console.log("Access token is not valid");
      else if (results.length > 0) {
        connection.query(
          `UPDATE accounts SET reset_token=null WHERE id="${results[0].id}"`,
          function (error, results, fields) {
            if (error) console.log("Could not remove token from data base");
            else res.status(200).send("Access token is not valid");
          }
        );
      }
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
