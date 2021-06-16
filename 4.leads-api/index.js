const express = require('express');
// const helpers = require('./helpers'); //Requires the help functions.
const app = express();

app.get('/', function(req, res) {
  res.sendFile('/Users/maayanbuzaglo/Documents/Github/crm-bootcamp/2.landing-page-vanila/landingPage.html');
});

app.post('/validateParameters', (req, res) => {
  res.status(500).send(helpers.test());
  //take parameters
  //run validation logic
  //return is valid or not and correct status
})

app.listen(8080, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});