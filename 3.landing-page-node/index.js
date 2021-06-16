const express = require('express');
const mustacheExpress = require('mustache-express');
const helpers = require('./helpers'); //Requires the help functions.

const app = express();
app.use(express.static('views'));

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views'); //For calling from location down.

app.get('/', function(req, res) {
  const {name, country} = req.query;

  const data = {
    //Make the input text for submit details.
    validate: function()
    {
      const {name, phone, email} = req.query;
      if(phone.length < 3) return "invalid phone";
    },
    getInputs: function(type)
    {
      result = '';
      types = ["name", "phone", "email"];
      for(type of types)
      {
        result += helpers.getInputsHelper(type);
      }
      return result;
    },
    
    //Shows the flag of the country if defined.
    getFlag: function()
    {
      if(country) return '<img src="img/flags/' + country + '.png" alt="flag picture" id="flag-img">';
    },
    //Says hello if name defined.
    addName: function(){
      if(name) return 'Hello ' + name.toUpperCase() + '!';
    },
    titleRow1: 'A GREAT MEAL',
    titleRow2: 'changes everything',
    view: 'Choose from a variety of up to 30 weekly meals with high-quality ingredients and options for every lifestyle including vegetarian, carb conscious, WW™ Approved, and more.',
    viewBtn: 'VIEW PLANS',
    quote: "If we're not willing to settle for junk living,<br>we certainly shouldn't settle for junk food<br>",
    writer: 'Sally Edwards',
    submitRow1: 'MAKE YOUR DAY BETTER',
    submitRow2: 'Get 15% off for first order',
    submitBtn: 'SUBMIT'
  };
  res.render('landingPage', data);
});

app.listen(8080, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});






// app.get('/m', (req, res) => {
//   // res.status(200).send(helpers.test());
//   // try{
//   // console.log(req.params);
//   // }
//   // catch{
//   //   console.log('error')
//   // }
//   //take parameters
//   //run validation logic
//   //return is valid or not and correct status
// })