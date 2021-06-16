module.exports.getInputsHelper = function(type)
{
  return '<label for = ' + type + '> </label><input id="input" type="text" placeholder=' + type[0].toUpperCase() + type.slice(1)+ ' name=' + type + ' required /><h1 id="invalid"><br></h2>';
};