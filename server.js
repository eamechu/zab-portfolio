var http = require('http');
var fs = require('fs');
var app = require('./app');

http.createServer(app.handleRequest).listen(5000);