var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var method = req.method;
  var url = urlParser.parse(req.url).pathname;

  archive.isUrlInList(url, function(url) {

    archive.isUrlArchived(url, function(url) {
      //if archived, return redirect to archived version
      //if not, redirect to loading.html
    });

  });

  res.end(archive.paths.list);
  // console.log(res.end(archive.paths.list))
};
