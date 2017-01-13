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

exports.serveAssets = function(res, asset, callback) {

};

exports.sendRedirect = function(res, location, status) {
  status = status || 302;
  res.writeHead(status, {Location: location});
  res.end();
};

exports.sendResponse = function(res, obj, status) {
  status = status || 200;
  res.writeHead(status, exports.headers);
  res.end(obj);
};

exports.send404 = function(res) {
  exports.sendResponse(res, 'Page not found', 404);
};






























// exports.collectData = function(req, callback) {
//   var data = '';
//   req.on('data', function(chunk) {
//     data += chunk;
//   });
//   req.on('end', function(data) {
//     callback(data);
//   });
// }