/*********************
 * main.js
 ********************/

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

io.sockets.on('connection', function (socket) {
	console.log("New connection");
	socket.on('echo', function (data) {
		console.log("Somebody used echo:"+data);
		socket.emit('echo','Echo:'+data);
  });
});

