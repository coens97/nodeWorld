/*****************
 * game.js
 ****************/
var player = require("./player"),
	room = require("./room"),
	stats = require("./stats");
 
var players = {};//this will contains all players and info about them
 
this.newConnection = function(socket){
	//here must al the user specific stuff		
	this.nickname;
	this.player;
	this.nickname = function(data){
		if(typeof(this.nickname)!='undefined'){//check if he already has a nickname
			console.log(now()+"Ehm something went wrong because he already has a nickname");
			socket.emit("go",1);//just let him trough without changing nickname
			room.sendRooms(socket);
			return;
		}
		console.log(now()+"Nickname:"+data);
		if(typeof(players[data])!='undefined'){
			console.log(now()+"Nickname already used");
			socket.emit("go",0);
		}else{
			console.log(now()+"ip-info, nickname:"+data+" ip:"+socket.handshake.address.address+" port:"+socket.handshake.address.port);
			players[data] = new player.player(socket);
			this.player = players[data];
			this.player.state = 1;
			this.player.nickname = data;
			this.nickname = data;
			socket.emit("go",1);
			room.sendRooms(socket);
		}
	};
	socket.on('nickname',this.nickname);
	
	/**debuging**/
	socket.on('echo', function (data) {
		console.log(now()+"Echo:"+data);
		socket.emit('echo','Echo:'+data);
	});
	socket.on('ping', function(data){
		socket.emit('pong',new Date().getTime());//send server time
	});
	/**game**/
	this.playerCount = function(){//send how much people are online
		socket.broadcast.emit("playerCount",stats.connections);
		socket.emit("playerCount",stats.connections);
	};
	this.disconnected = function(){//when someone disconnected
		stats.connections--;	
		console.log(now()+"Somebody disconnected "+stats.connections);
		socket.broadcast.emit("playerCount",stats.connections);
		//check if in room
		if(typeof(this.nickname)!='undefined'&&typeof(this.player.room)!='undefined'){
			var theRoom = this.player.room;
			this.player.room.disconnect(this.nickname);//remove player from scene
			if(Object.keys(theRoom.players).length == 0){//if there are no players in scene
				console.log(now()+theRoom.name + " room is empty, going to remove it now");
				room.rooms[theRoom.name].stopGame();
				delete room.rooms[theRoom.name];
			}
			emitRooms();//send room info to clients
		}
		delete players[this.nickname];//delete player
	};
	/***********rooms***************/
	this.hostGame = function(data){//when somebody host a game
		if(this.player.state==1){
			if(typeof(room.rooms[data.name])!='undefined'){//check if room already excist
				console.log(now()+this.nickname+" tries to create a game with a name("+data.name+") that's already used");
				socket.emit('hostGame',0);
				return;
			}
			console.log(now()+this.nickname+" tries to host a game");
			console.log(now()+"Room:"+data.name);
			
			room.rooms[data.name] = new room.room(data.name,data.speed);//create the room
			room.rooms[data.name].addPlayer(this.nickname,players[this.nickname]);//add player to scene

			socket.emit('hostGame',1);//say to the client it's ok
			//send to the other client this room is available
			emitRooms();
		}else{//ehm he did something wrong because the state should be one
			console.log(now()+"Ehm"+this.nickname+"with state "+this.player.state+"tries to host a game");
			socket.emit('hostGame',0);
		}
	};
	this.leaveRoom = function(data){
		var theRoom = this.player.room;
		this.player.room.disconnect(this.nickname);//leave room
		this.player.state = 1;
		if(Object.keys(theRoom.players).length == 0){//if there are no players in scene
			console.log(now()+theRoom.name + " room is empty, going to remove it now");
			room.rooms[theRoom.name].stopGame();
			delete room.rooms[theRoom.name];
		}
		socket.emit('leaveRoom',true);
		emitRooms();//the count of number of room have changed
	};	
	this.toRoom = function(data){
		console.log(now()+this.nickname+" wants to join "+data);
		room.rooms[data].addPlayer(this.nickname,players[this.nickname]);//add player to scene
		socket.emit('toRoom',1);
		emitRooms();//because the number of players have changed
	}
	socket.on('leaveRoom',this.leaveRoom);
	socket.on('disconnect',this.disconnected);
	socket.on('hostGame',this.hostGame);
	socket.on('toRoom',this.toRoom);
	//on new connection
	console.log(now()+"New connection "+ ++stats.connections);//also add 1 connection to the count 
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

