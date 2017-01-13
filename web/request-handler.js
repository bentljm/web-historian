var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers.js');
var headers = httpHelp.headers;
var urlParser = require('url');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var method = req.method;
  var url = urlParser.parse(req.url).pathname.slice(1);
  if (url === '/') {
    url = '/index.html';
  }

  if (method === 'GET') {
  //1. check public folder
    fs.readFile(archive.paths.siteAssets + '/' + url, 'utf8', function(err, data) {
      //2. if doesn't exist, check archived folder
      if (err) {
        fs.readFile(archive.paths.archivedSites + '/' + url, 'utf8', function(err, data) {
          //3. if doesn't exist, respond with 404 code
          if (err) {
            //return 404 code
            httpHelp.send404(res);
          } else {
             //serve file
            httpHelp.sendResponse(res, data);
          }
        });
      } else {
        //serve file
        httpHelp.sendResponse(res, data);
      }
    });
  } else if (method === 'POST') {

    archive.isUrlInList(url, function(result) {

      if (result) {

      } else {
        //call downloadURLs
      }

    });

  }


  //res.end(archive.paths.list);
  // console.log(res.end(archive.paths.list))
};
