// Helpers functions

//This function makes the inputs in the landing page for the submit.
module.exports.getInputsHelper = function(type) {
    return '<label for = ' + type + '> </label><input id="input" type="text" placeholder=' +
        type[0].toUpperCase() + type.slice(1) + ' name=' + type + ' required />';
};

//This function makes the leads table.
module.exports.createLeadsTable = function(leads) {
    result = '';
    for (lead of leads) {
        result += '<tr><td id="id">' + lead.id + '</td><td>' + lead.first_name + '</td><td>' + lead.last_name + '</td><td>' + lead.phone_number + '</td><td>' + lead.email_address + '</td></tr><tr>'
    }
    return result;
};