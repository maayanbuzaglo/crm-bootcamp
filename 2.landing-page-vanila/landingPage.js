function validateEmail(e) {
    e.preventDefault(); //for prevent the reload of page.
    var emailInput = document.form1.email.value; //gets the email.
    var validRegex = /^([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/; //email Regex.

    //If email correct - alert.
    if (emailInput.match(validRegex)){
        alert("We sent the details to your email\n Have a nice day :)");
        location.reload();
    }
    //else - invalid mail text.
    else
    {
        document.getElementById("email-input").innerHTML = "";
        var invalidMail = document.getElementById("invalid-mail").innerHTML = "Invalid email. please try again";
        document.form1.email.focus();
    }
  }