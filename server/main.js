/*********************
 * main.js
 ********************/
var game = require("./game.js");
/********************
 * HTTPServer
 *******************/
var express = require('express'),
	app = express(),//httpServer middleware
	server = require('http').createServer(app),//httpServer
	io = require('socket.io').listen(server);//websocket

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(rootDir + '/client'));
  app.use(express.errorHandler({
    dumpExceptions: false, 
    showStack: false
  }));
  app.use(app.router);
});
server.listen(config.port);
/*********************
 * Websocket
 ********************/
io.set('log level', 1);//don't show all that boring debug data

io.sockets.on('connection', function (socket) {
	game.newConnection(socket);
});

console.log(now()+"Server started");