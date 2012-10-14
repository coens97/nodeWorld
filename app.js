console.log("Starting server");
rootDir = __dirname;//so we now what is the root directory in other files
config = require('./config');

var httpServer = require("./server/httpServer");
var ws = require("./server/socket");
ws.startServer(httpServer.server);