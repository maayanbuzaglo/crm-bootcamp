function validateEmail() {
    var emailInput = document.form1.email.value;
    var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailInput.match(validRegex)){
      alert("We sent the details to your email\n Have a nice day :)");
    //   document.form1.email.focus();
      document.getElementById("invalid-mail").innerHTML = "";
      document.getElementById("email-input").innerHTML = "";
    }
    else
    {
        var invalidMail = document.getElementById("invalid-mail").innerHTML = "mmm";
        // document.form1.email.focus();
    //   return false;
    }
  }