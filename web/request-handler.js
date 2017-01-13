var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers.js');
var headers = httpHelp.headers;
var urlParser = require('url');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var method = req.method;
  var url = urlParser.parse(req.url).pathname;

  if (url === '/') {
    url = 'index.html';
  } else {
    url = url.slice(1);
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
  }

  if (method === 'POST') {
    console.log(req.post);
    console.log(req.url);
    //1. check list
    archive.isUrlInList(url, function(result) {
      // 2. if in list, check archived folder
      if (result) {
        //check archive
        archive.isUrlArchived(url, function(result) {
          //if archived, redirect to archived page
          if (result) {
            //serve files
            httpHelp.sendRedirect(res, url);
          } else {
            //redirect to loading page
            httpHelp.sendRedirect(res, '/loading.html');
          }
        });
      } else {
        //call downloadURLs, add it to the list
        archive.addUrlToList(url, function(result) {
          //also redirect to loading page
          //console.log('success')
          httpHelp.sendRedirect(res, '/loading.html');
        });
      }
    });
  }
};
