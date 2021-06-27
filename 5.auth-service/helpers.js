// Helpers functions

const jwt = require("jsonwebtoken");

//Secret token to sign the JWT token.
const accessTokenSecret = "ab4rf5gt7yh2";

//This function validate user submission details.
module.exports.validateInputs = function (phone, email, password) {
  invalidInputs = [];
  const phoneRegex = /^05\d([-]{0,1})\d{7}$/; //phone Regex.
  const emailRegex =
    /^([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/; //email Regex.
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //minimum eight characters, at least one letter and one number:

  //if invalid phone number - add to invalid inputs list.
  if (!phone.match(phoneRegex)) {
    invalidInputs.push("phone");
  }

  //if invalid mail address - add to invalid inputs list.
  if (!email.match(emailRegex)) {
    invalidInputs.push("email");
  }

  //if invalid password number - add to invalid inputs list.
  if (!password.match(passwordRegex)) {
    invalidInputs.push("password");
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
