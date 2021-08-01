var jwt = require("jsonwebtoken");
const MailGun = require("mailgun-js");
const dotenv = require("dotenv");

dotenv.config();

//Secret token to sign the JWT token.
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

/**
 * This function validate user submission details.
 * @returns an array of the invalid inputs.
 */
module.exports.validateInputs = function (phone, email, password) {
  invalidInputs = [];
  const phoneRegex = /^05\d([-]{0,1})\d{7}$/; //phone Regex.
  const emailRegex =
    /^([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/; //email Regex.
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //minimum eight characters, at least one letter and one number.

  if (phone != null) {
    //if invalid phone number - add to invalid inputs list.
    if (!phone.match(phoneRegex)) {
      invalidInputs.push("phone");
    }
  }

  if (email != null) {
    //if invalid mail address - add to invalid inputs list.
    if (!email.match(emailRegex)) {
      invalidInputs.push("email");
    }
  }

  //if invalid password number - add to invalid inputs list.
  if (password != null) {
    if (!password.match(passwordRegex)) {
      invalidInputs.push("password");
    }
  }
  return invalidInputs;
};

/**
 * This function verify token with the accessTokenSecret.
 */
module.exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    const details = jwt.verify(token, accessTokenSecret);

    if (!details) {
      return res.sendStatus(403);
    }
    req.data = details;
    next();
  } else {
    res.sendStatus(401);
  }
};

/**
 * This function send an email.
 */
module.exports.sendEmail = (from, to, subject, html) => {
  const mailGun = new MailGun({
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_ADMIN,
  });
  var data = {
    //Specify email data.
    from: from,
    //The email to contact.
    to: to,
    //Subject and text data.
    subject: subject,
    html: html,
  };
  //Invokes the method to send emails given the above data with the helper library
  mailGun.messages().send(data, function (err, body) {
    //If there is an error, render the error page
    if (err) {
      return err;
    }
  });
};
