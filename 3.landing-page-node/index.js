const express = require("express");
const mustacheExpress = require("mustache-express");
const axios = require("axios");
const helpers = require("./helpers"); //Requires the help functions.

const app = express();
app.use(express.static("views"));

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views"); //For calling from location down.

//Gets the landing page.
app.get("/", function (req, res) {
  const { name, country } = req.query;

  const data = {
    //Make the input text for submit details.
    getInputs: function (type) {
      result = "";
      types = ["first_name", "last_name", "phone", "email"];
      for (type of types) {
        result += helpers.getInputsHelper(type);
      }
      return result;
    },

    //Shows the flag of the country if defined.
    getFlag: function () {
      if (country)
        return (
          '<img src="img/flags/' +
          country +
          '.png" alt="flag picture" id="flag-img">'
        );
    },

    //Says hello if name defined.
    addName: function () {
      if (name) return "Hello " + name.toUpperCase() + "!";
    },

    titleRow1: "A GREAT MEAL",
    titleRow2: "changes everything",
    view: "Choose from a variety of up to 30 weekly meals with high-quality ingredients and options for every lifestyle including vegetarian, carb conscious, WW™ Approved, and more.",
    viewBtn: "VIEW PLANS",
    quote:
      "If we're not willing to settle for junk living,<br>we certainly shouldn't settle for junk food<br>",
    writer: "Sally Edwards",
    submitRow1: "MAKE YOUR DAY BETTER",
    submitRow2: "Get 15% off for first order",
    submitBtn: "SUBMIT",
  };
  res.render("landingPage", data);
});

//Gets the leads page.
app.get("/admin", async function (req, res) {
  const { sorted_column, isDesc } = req.query;
  const leads = (
    await axios.post("http://homemade.delivery.com:8004/getAllLeads", {
      sorted_column: sorted_column,
      isDesc: isDesc === "false" ? false : true,
    })
  ).data;
  const data = {
    createTable: helpers.createLeadsTable(leads),
  };
  res.render("leadsPage", data);
});

//Gets the chat.
app.get("/chat", async function (req, res) {
  res.render("chat");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
