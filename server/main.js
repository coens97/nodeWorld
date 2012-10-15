/*********************
 * main.js
 ********************/

/********************
 * HTTPServer
 *******************/
var httpServer = require('http').createServer(httpHandler),//httpserrver
	fs = require('fs'),//get into filesystem
	mime = require('mime'),//send the right filetype to the client
	url = require('url');//parse url
 
httpServer.listen(config.port);//listen to port
console.log("HTTP server started at:"+config.port);

function httpHandler (req, res) {
    config.logHHTP&&console.log("Page loading:"+url.parse(req.url).href);//log when file is loaded when it's in config is configures
    var theUrl;
	if(url.parse(req.url).href=="/"){
		theUrl = "index.html";
	}
	else{
		theUrl = url.parse(req.url).href;
	}
  fs.readFile(rootDir + '/client/'+theUrl,
  function (err, data) {
    if (err) {
        config.logHHTP&&console.log("Page failed loading:"+url.parse(req.url).href);
	    res.writeHead(500);
        return res.end('Whazup dude\nJammer de pagina laadt niet');
    }
    res.writeHead(200, {'Content-Type':mime.lookup(theUrl)});
    res.end(data);
  });
}

var io = require('socket.io').listen(httpServer);//start websocketserver

io.sockets.on('connection', function (socket) {
	console.log("New connection");
	socket.on('echo', function (data) {
		console.log("Somebody used echo:"+data);
		socket.emit('echo','Echo:'+data);
  });
});

