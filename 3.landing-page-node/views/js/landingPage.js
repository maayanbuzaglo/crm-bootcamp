function validateEmail(e) {
  e.preventDefault();
  axios
    .post("http://homemade.delivery.com:8004", {
      firstName: document.form1.first_name.value, //gets the first name.
      lastName: document.form1.last_name.value, //gets the last name.
      phone: document.form1.phone.value, //gets the phone number.
      email: document.form1.email.value, //gets the email.
    })
    .then(function (response) {
      console.log(response);
      alert("We sent the details to your email \n Have a nice day :)");
      location.reload();
    })
    .catch(function (error) {
      document.getElementById("invalid").innerHTML =
        "Invalid email address/phone number. please try again";
      document.form1.email.focus();
      console.log(error);
    });
}

flag = false;

//This function sorts the leads.
function onSort(e, type) {
  flag = !flag;
  console.log(flag);
  axios
    .get(
      `http://homemade.delivery.com:8003/admin?sorted_column=${type}&isDesc=${
        flag ? "true" : "false"
      }`
    )
    .then(function (response) {
      document.documentElement.innerHTML = response.data;
    });
}
