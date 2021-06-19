// Helpers functions

//This function validate user submission details.
module.exports.validateInputs = function(phone, email) {
    invalidInputs = [];
    const phoneRegex = /^05\d([-]{0,1})\d{7}$/; //phone Regex.
    const emailRegex = /^([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/; //email Regex.

    //if invalid phone number - add to invalid inputs list.
    if (!phone.match(phoneRegex)) {
        invalidInputs.push(phone);
    }

    //if invalid mail address - add to invalid inputs list.
    if (!email.match(emailRegex)) {
        invalidInputs.push(email);
    }
    return invalidInputs;
}