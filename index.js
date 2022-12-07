const http = require('http');

// Server uygulaması
const app = require('./app');

const server = http.createServer(app);

module.exports = server

/*
var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
...
server.listen(1234);
However, app.listen() also returns the HTTP server instance, so with a bit of rewriting you can achieve something similar without creating an HTTP server yourself:

var express   = require('express');
var app       = express();
// app.use/routes/etc...
var server    = app.listen(3033);
var io        = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  ...
});
*/
