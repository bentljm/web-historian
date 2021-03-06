var fs = require('fs');
var http = require('http');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function (err, content) {
    if (err) {
      callback (err);
    } else {
      content = content.split('\n');
      callback (content);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', function (err, content) {
    if (err) {
      callback (err);
    } else {
      content = content.split('\n');
      var found = false;
      content.forEach(function (item) {
        if (item === url) {
          found = true;
        }
      });
      callback(found);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(exports.paths.list, url + '\n', function (err) {
    if (err) {
      callback (err);
    } else {
      //console.log("Successfully added URL to List")
      callback (url);
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function (err, files) {
    if (err) {
      callback (err);
    } else {
      var found = false;
      files.forEach(function (file) {
        //console.log(file)
        if (file === url) {
          found = true;
        }
      });
      callback(found);
    }
  });
};

exports.downloadUrls = function(urls) {
  urls.forEach(function(url) {
    var fullName = 'http://' + url;
    var file = fs.createWriteStream(exports.paths.archivedSites + '/' + url);
    var request = http.get(fullName, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close();
      });
    });
  });
};
