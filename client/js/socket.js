//start websocket
var socket = io.connect('http://'+window.location.host);

socket.on('connect', function () {
	console.log("We have connection! :)");
	document.getElementById("status").style.backgroundColor = "#00FF00";
});
socket.on('disconnect', function () {
	console.log("Connection lost");
	document.getElementById("status").style.backgroundColor = "#FF0000";
});
