var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers.js');
var headers = httpHelp.headers;
var urlParser = require('url');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var method = req.method;
  var url = urlParser.parse(req.url).pathname.slice(1);

  if (url === '/') {
    url = '/index.html';
  }

  if (method === 'GET') {
    //do something -- server assets

    archive.isUrlInList(url, function(result) {
      //console.log(result)
      if (result) {

        archive.isUrlArchived(url, function(result) {

          if (result) {
            //return archived version
            //console.log('we found thew url')
            //console.log(archive.paths.archivedSites + '/' + url)
            res.writeHead(200, headers);
            res.end(archive.paths.archivedSites + '/' + url);

          } else {
            //redirect to loading.html
          }

        });

      } else {

        res.writeHead(404, headers);
        res.end();

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
