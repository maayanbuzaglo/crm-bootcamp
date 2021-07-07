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

/**
 * TEAM get
 * @returns users table - only visible to authenticated users.
 **/
//, helpers.authenticateJWT
app.get("/team", helpers.authenticateJWT, function (req, res) {
  const accountId = req.data.user_id;

  connection.query(
    `SELECT id, first_name, last_name, phone_number, email_address, status FROM users WHERE account_id=${accountId}`,
    function (error, results, fields) {
      if (error) {
        res.send(400, error);
        return;
      } else {
        res.json(results);
      }
    }
  );
});

/**
 * LOGIN post
 * This function makes an access token with user id and email,
 * and inserts it to his row in users table.
 * @returns
 **/
app.post("/login", function (req, res) {
  let accountId = 0;
  const emailInput = req.body.form.email;
  password = req.body.form.password;

  connection.query(
    `SELECT password, id, account_id FROM users WHERE email_address="${emailInput}"`,
    function (error, results, fields) {
      if (error) {
        res.send(400, error);
        return;
      }
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
        accountId = results[0].account_id;
        const accessToken = jwt.sign(
          {
            username: emailInput,
            user_id: results[0].id,
            account_id: results[0].account_id,
          },
          accessTokenSecret
        );
        return res.cookie("jwt", accessToken).json({
          accessToken,
          accountId,
        });
      }
    }
  );
});

/**
 * FORGOT PASSWORD post
 * This function checks if email input exist and send it a reset link with access Token.
 **/
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
        } catch {
          res.status(400).send("got an error: ", err);
        }
        res.status(200).send("successful");
      }
    }
  );
});

/**
 * RESET PASSWORD post
 * This function checks password validation,
 * and resets the user password in users table.
 **/
app.post("/resetPassword", function (req, res) {
  password = req.body.form.password;
  id = req.body.form.id;

  const invalidInputs = helpers.validateInputs(null, null, password);

  password = md5(password);

  //if all inputs are valid - insert to mySQL table.
  if (invalidInputs.length === 0) {
    connection.query(
      `UPDATE users SET password="${password}", status="${1}", reset_token=null WHERE id="${id}"`,
      function (error, results, fields) {
        if (error) {
          res.status(200).send("MySQL update error");
          return;
        }
      }
    );
    res.status(200).send("successful");
  }
  //else - return error with the invalid inputs.
  else {
    res.status(500).json({
      msg: "Error creating",
      invalidInput: invalidInputs,
    });
  }
});

/**
 * ADD USER post
 * This function gets the new user details,
 * checks validation
 * and inserts them to the users table with status code 0.
 * and send a sign up link to his email.
 **/
app.post("/addUser", async function (req, res) {
  const firstName = req.body.form.first_name;
  const lastName = req.body.form.last_name;
  const phoneNumber = req.body.form.phone;
  const emailAddress = req.body.form.email;
  const accountToken = req.body.form.account_token;

  const accountDetails = jwt.verify(accountToken, accessTokenSecret);
  const accountId = accountDetails.user_id;

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
        `INSERT INTO users (first_name, last_name, phone_number, email_address, reset_token, account_id) VALUES ("${firstName}", "${lastName}", "${phoneNumber}", "${emailAddress}", "${accessToken}", "${accountId}")`
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
    res.status(200).send("successful");
  }
  //else - return error with the invalid inputs.
  else {
    res.status(500).json({
      msg: "Error creating",
      invalidInput: invalidInputs,
    });
  }
});

/**
 * SIGN UP post
 * This function gets the new user details,
 * checks validation
 * and inserts them to the users table with status code 0.
 * and send a sign up link to his email.
 **/
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

/**
 * DELETE USER post
 * This function deletes user from users table.
 **/
app.post("/deleteUser", function (req, res) {
  id = req.body.id;

  connection.query(
    `DELETE FROM users WHERE id=${id};`,
    function (error, results, fields) {
      if (error) {
        res.status(200).send("MySQL update error");
        return;
      } else res.status(200).send("User deleted successfully");
    }
  );
});

/**
 * RESET PASSWORD post
 * This function check if access token is valid.
 * @returns user id
 **/
app.get("/resetPassword", async function (req, res) {
  const accessToken = req.query[0];
  await connection.query(
    `SELECT id FROM users WHERE reset_token="${accessToken}"`,
    function (error, results, fields) {
      if (error) res.status(500).send("access token is not valid");
      //if the query returned an id.
      else if (results.length > 0) {
        res.json({ id: results[0].id });
      } else res.status(500).send("error");
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
