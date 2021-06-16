function validateEmail(e) {
    // //If email correct - alert.
    // if (emailInput.match(validRegex)){
    //     alert("We sent the details to your email\n Have a nice day :)");
    //     location.reload();
    //     return true;
    // }
    // //else - invalid mail text.
    // else
    // {
    //     document.getElementById("input").innerHTML = "";
    //     document.getElementById("invalid").innerHTML = "Invalid email. please try again";
    //     document.form1.email.focus();
    //     return false;
    // }
    e.preventDefault();
    axios.post('http://homemade.delivery.com:8004', {
      firstName: document.form1.first_name.value,
      lastName: document.form1.last_name.value,
      phone: document.form1.phone.value,
      email: document.form1.email.value //gets the email. 
    })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }