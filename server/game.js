/*****************
 * game.js
 ****************/
var player = require("./player"),
	stats = require("./stats");
 
var players = {};
 
exports.newConnection = function(socket){
	//here must al the user specific stuff		
	this.nickname = "";
	this.player;
	socket.on('nickname', function (data) {//for debugging
		if(this.nickname == ""){//check if he already has a nickname
			console.log("Ehm something went wrong because he already has a nickname");
			socket.emit("go",1);//just let him trough without changing nickname
			return;
		}
		console.log("Nickname:"+data);
		if(typeof(players[data])!='undefined'){
			console.log("Nickname already used");
			socket.emit("go",0);
		}else{
			players[data] = new player.player();
			this.player = players[data];
			this.player.state = 1;
			this.nickname = data;
			socket.emit("go",1);
		}
	});
	
	socket.on('echo', function (data) {//for debugging
		console.log("Echo:"+data);
		socket.emit('echo','Echo:'+data);
	});
	
	this.playerCount = function(){//send how much people are online
		socket.broadcast.emit("playerCount",stats.connections);
		socket.emit("playerCount",stats.connections);
	};
	this.disconnected = function(){//when someone disconnected
		stats.connections--;	
		console.log("Somebody disconnected "+stats.connections);
		socket.broadcast.emit("playerCount",stats.connections);
		delete players[this.nickname];
	};
	this.hostGame = function(data){//when somebody host a game
		if(this.player.state==1){
			console.log(this.nickname+" tries to host a game");
			socket.emit('hostGame',1);
		}else{//ehm he did something wrong because the state should be one
			console.log("Ehm"+this.nickname+"with state "+this.player.state+"tries to host a game");
			socket.emit('hostGame',0);
		}
	};
	socket.on('disconnect',this.disconnected);
	socket.on('hostGame',this.hostGame);
	//on new connection
	console.log("New connection "+ ++stats.connections);//also add 1 connection to the count 
	socket.broadcast.emit("playerCount",stats.connections);
	this.playerCount();
}


