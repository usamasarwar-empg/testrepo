#!/usr/bin/env node
"use strict";

var http = require('http');

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // require('../config/env');

var App = require('./app');

var server = null;
var port = 0;

function main() {
  App().then(function (app) {
    // Function for normalizing a port into a number, string, or false.
    function normalizePort(val) {
      port = parseInt(val, 10);

      if (Number.isNaN(port)) {
        // named pipe
        return val;
      }

      if (port >= 0) {
        // port number
        return port;
      }

      return false;
    } // Event listener for HTTP server "error" event.


    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      var bind = typeof port === 'string' ? "Pipe ".concat(port) : "Port ".concat(port); // handle specific listen errors with friendly messages

      switch (error.code) {
        case 'EACCES':
          console.error("".concat(bind, " requires elevated privileges"));
          process.exit(1);
          break;

        case 'EADDRINUSE':
          console.error("".concat(bind, " is already in use"));
          process.exit(1);
          break;

        default:
          throw error;
      }
    } // Event listener for HTTP server "listening" event.


    function onListening() {
      var addr = server.address();
      var bind = typeof addr === 'string' ? "pipe ".concat(addr) : "port ".concat(addr.port);
      console.log("Listening on ".concat(bind));
    } // ----------
    // MAIN CODE
    // ----------


    app.set('port', port); // Get port from environment and store in Express.

    port = normalizePort(process.env.PORT || '5000'); // Create HTTP server.

    server = http.createServer(app); // Listen on provided port, on all network interfaces.

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  })["catch"](function (err) {
    console.error(err);
    process.exit(1);
  });
}

if (require.main === module) {
  main();
} else {
  module.exports = main;
}