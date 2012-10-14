/*********************
 * main.js
 ********************/
var httpServer = require("./httpServer");//start http server
var ws = require("./socket");//use websocketserver
ws.startServer(httpServer.server);//start websocketserver