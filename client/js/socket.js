//start websocket
var socket = io.connect('http://'+window.location.host);

socket.on('connect', function () {
	console.log("We have connection! :)");
});
socket.on('disconnect', function () {
	console.log("Connection lost");
});
