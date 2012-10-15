//start websocket
var socket = io.connect('http://'+window.location.host);
var gotConnection = false;
socket.on('connect', function () {
	console.log("We have connection! :)");
	document.getElementById("status").style.backgroundColor = "#00FF00";
	gotConnection = true;
	if(typeof game != 'undefined'){
		game.newConnection();
	}
});
socket.on('disconnect', function () {
	console.log("Connection lost");
	document.getElementById("status").style.backgroundColor = "#FF0000";
	gotConnection = false;
});

socket.on('echo', function (data) {
	console.log(data);
});

socket.on('playerCount', function (data) {
	console.log("Number of players changed:"+data);
	document.getElementById("count").innerHTML = data;
});
