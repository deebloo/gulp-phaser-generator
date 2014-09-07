module.exports = function(file, orig, rplcmt)
{

  var fs = require('fs');

  //Read file
  fs.readFile(file, function(err, data)
  {

    // check to see if the source is an array
    if(!Array.isArray(orig))
    {

      data = data.toString().replace('%' + orig + '%', rplcmt);

    }
    else
    {

      for(var i = 0, len = orig.length; i < len; i++)
      {

        data = data.toString().replace('%' + orig[i] + '%', rplcmt[i]);

      }

    }

    fs.writeFile(file, data);

  });

};