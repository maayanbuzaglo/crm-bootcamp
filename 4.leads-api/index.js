const express = require('express');
const cors = require('cors');
const helpers = require('./helpers');

const bodyParser = require('body-parser');

//mySQL connection.
var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
database : 'crm'
});

connection.connect();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function(req, res) {

  const firstName = req.body.firstName; //First name
  const lastName = req.body.lastName; //Last name
  const phoneNumber = req.body.phone; //Phone number
  const emailInput = req.body.email; //Email address

  const invalidInputs = helpers.validateInputs(phoneNumber, emailInput);

      //if valid mail text - return ok.
      if (invalidInputs.length === 0)
      {
        connection.query(`INSERT INTO leads (email_address, first_name, last_name, phone_number) VALUES ("${firstName}", "${lastName}", "${phoneNumber}", "${emailInput}")`, function(error, results, fields){
          if (error) console.log(error);
        });
        res.status(200).send("We sent the details to your email\n Have a nice day :)");
      }
      //else - invalid mail text.
      else
      {
        res.status(500).json({
          msg: "Error creating",
          invalidInput: invalidInputs
        });
      }
});

app.get('/', function(req, res) {
  const mail = req.body.email;
  
  res.send(mail);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});