// Helpers functions

const jwt = require("jsonwebtoken");
const MailGun = require("mailgun-js");

//Secret token to sign the JWT token.
const accessTokenSecret = "ab4rf5gt7yh2";

//This function validate user submission details.
module.exports.validateInputs = function (phone, email, password) {
  invalidInputs = [];
  const phoneRegex = /^05\d([-]{0,1})\d{7}$/; //phone Regex.
  const emailRegex =
    /^([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/; //email Regex.
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //minimum eight characters, at least one letter and one number:

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

module.exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[2];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//This function send an email.
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
