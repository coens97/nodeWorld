var waitingRoom = require('./waitingRoom'),
	gameRoom = require('./gameRoom');
this.rooms = {};

this.room = function(name,laps){
	var room = this;
	this.name = name;
	this.state = 0;//waiting
	this.laps = laps;
	this.players = {};
	this.waitingRoom = new waitingRoom.waitingRoom(this);
	this.gameRoom = new gameRoom.gameRoom(this);
	this.addPlayer = function(nickname,player){//when player goes to room
		//asign variables
		this.players[nickname] = player;
		this.player = this.players[nickname];
		this.socket = this.player.socket;
		this.player.state = 2;//scene state
		this.player.room = room;
		//functions here		
		this.player.ready = false;
		room.waitingRoom.addPlayer(this.socket,this.player);
		room.gameRoom.addPlayer(this.socket,this.player);
		room.waitingRoom.broadcastRooms();
	};
	this.disconnect = function(nickname){
		console.log(nickname+" left the room "+ this.name);
		delete this.players[nickname];
		this.waitingRoom.broadcastRooms();
	};
	this.startGame = function(){
		console.log("Everyone is ready in "+room.name+" let's start the game");
		for(var cPlayer in room.players){
			room.players[cPlayer].socket.emit('startGame',true);
		}
	}
}

/* send rooms to menu of client */
this.sendRooms = function(socket){
	var tmp = [];
	for(var Name in this.rooms){
		tmp.push({name:Name,laps:this.rooms[Name].laps,players:Object.keys(this.rooms[Name].players).length});
	}
	socket.emit("rooms",tmp);
}