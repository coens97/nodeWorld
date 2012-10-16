/*****************
 * game.js
 ****************/
var player = require("./player"),
	stats = require("./stats");
 
var players = {};
 
exports.newConnection = function(socket){
	//here must al the user specific stuff		
	this.nickname = "";
	
	socket.on('nickname', function (data) {//for debugging
		console.log("Nickname:"+data);
		if(typeof(players[data])!='undefined'){
			console.log("Nickname already used");
			socket.emit("go",0);
		}
		players[data] = new player.player();
		this.nickname = data;
		socket.emit("go",1);
	});
	
	socket.on('echo', function (data) {//for debugging
		console.log("Echo:"+data);
		socket.emit('echo','Echo:'+data);
	});
	
	this.playerCount = function(){
		socket.broadcast.emit("playerCount",stats.connections);
		socket.emit("playerCount",stats.connections);
	};
	this.disconnected = function(){
		stats.connections--;	
		console.log("Somebody disconnected "+stats.connections);
		socket.broadcast.emit("playerCount",stats.connections);
	};
	socket.on('disconnect',this.disconnected);
	//on new connection
	console.log("New connection "+ ++stats.connections);//also add 1 connection to the count 
	socket.broadcast.emit("playerCount",stats.connections);
	this.playerCount();
}


