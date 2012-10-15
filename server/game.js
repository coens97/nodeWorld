/*****************
 * game.js
 ****************/
var stats = require("./stats");
 
this.newConnection = function(socket){
	//here must al the user specific stuff	
	socket.on('echo', function (data) {//for debugging
		console.log("Echo:"+data);
		socket.emit('echo','Echo:'+data);
	});
	
	this.playerCount = function(){
		socket.broadcast.emit("playerCount",stats.connections);
		socket.emit("playerCount",stats.connections);
	};
	this.disconnected = function(){
		console.log("Somebody disconnected "+stats.connections);
		stats.connections--;		
	};
	socket.on('disconnect',this.disconnected);
	//new user
	console.log("New connection "+ ++stats.connections);//also add 1 connection to the count 
	socket.broadcast.emit("playerCount",stats.connections);
	this.playerCount();
}


