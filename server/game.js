/*****************
 * game.js
 ****************/
var player = require("./player"),
	room = require("./room"),
	stats = require("./stats");
 
var players = {};//this will contains all players and info about them
 
exports.newConnection = function(socket){
	//here must al the user specific stuff		
	this.nickname = "";
	this.player;
	this.nickname = function(data){
		if(this.nickname == ""){//check if he already has a nickname
			console.log("Ehm something went wrong because he already has a nickname");
			socket.emit("go",1);//just let him trough without changing nickname
			room.sendRooms(socket);
			return;
		}
		console.log("Nickname:"+data);
		if(typeof(players[data])!='undefined'){
			console.log("Nickname already used");
			socket.emit("go",0);
		}else{
			players[data] = new player.player(socket);
			this.player = players[data];
			this.player.state = 1;
			this.nickname = data;
			socket.emit("go",1);
			room.sendRooms(socket);
		}
	};
	socket.on('nickname',this.nickname);
	
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
	/***********rooms***************/
	this.hostGame = function(data){//when somebody host a game
		if(this.player.state==1){
			if(typeof(room.rooms[data.name])!='undefined'){//check if room already excist
				console.log(this.nickname+" tries to create a game with a name("+data.name+") that's already used");
				socket.emit('hostGame',0);
				return;
			}
			console.log(this.nickname+" tries to host a game");
			console.log("Room:"+data.name+" laps:"+data.laps);
			room.rooms[data.name] = new room.room(data.laps);//create the room
			room.rooms[data.name].players[this.nickname] = players[this.nickname];//add player to room
			this.player.state = 2;
			socket.emit('hostGame',1);//say to the client it's ok
			//send to the other client this room is available
			emitRooms();
		}else{//ehm he did something wrong because the state should be one
			console.log("Ehm"+this.nickname+"with state "+this.player.state+"tries to host a game");
			socket.emit('hostGame',0);
		}
	};	
	this.toRoom = function(data){
		console.log(this.nickname+" wants to join "+data);
		this.player.state = 2;
		room.rooms[data].players[this.nickname] = players[this.nickname];//add player to scene
		socket.emit('toRoom',1);
		emitRooms();//because the number of players have changed
	}
	
	socket.on('disconnect',this.disconnected);
	socket.on('hostGame',this.hostGame);
	socket.on('toRoom',this.toRoom);
	//on new connection
	console.log("New connection "+ ++stats.connections);//also add 1 connection to the count 
	socket.broadcast.emit("playerCount",stats.connections);
	this.playerCount();
}

function emitRooms(){
	for(var cPlayer in players){
		if(players[cPlayer].state == 1){
			room.sendRooms(players[cPlayer].socket);
		}
	}
}

