var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

// exports.sendResponse = function(res, obj, data) {
//   status = status || 200;
//   res.writeHead(status, headers);
//   res.end(obj);

// }

// exports.collectData = function(req, callback) {
//   var data = '';
//   req.on('data', function(chunk) {
//     data += chunk;
//   });
//   req.on('end', function(data) {
//     callback(data);
//   });
// }

exports.serveAssets = function(res, asset, callback) {
  //1. check public folder
  fs.readFile(archive.paths.siteAssets + asset, 'utf8', function(err, data) {
    //2. if doesn't exist, check archived folder
    if (err) {
      fs.readFile(archive.paths.archivedSites + asset, 'utf8', function(err, data) {
        //3. if doesn't exist, respond with 404 code
        if (err) {
          //return 404 code
        } else {
           //serve file
        }
      });
    } else {
      //serve file
    }
  });


};



// As you progress, keep thinking about what helper functions you can put here!
