var create = (function() {
  var fs = require('fs'),
      replace = require('../modules/replaceTemplates');

  return module.exports = {

    /**
     * @name Level Name
     * @param levelName the name of the level to create
     * @param callback
     * @description Create the scaffolding for a new game level
     */
    level: function(levelName, callback)
    {

      fs.mkdir('./app/js/levels', function(e) {

        var newFilePath = './app/js/levels/' + levelName + '.js',
            readStream = fs.createReadStream(__dirname + '/templates/level.txt'),
            writeStream = fs.createWriteStream(newFilePath);

        if(!e || (e && e.code === 'EEXIST'))
        {

          readStream.pipe(writeStream);

          writeStream.on('finish', function()
          {

            replace(newFilePath, 'LevelName', levelName);

            callback ? callback() : false;

          });

        }
      });

    }
  };
}());