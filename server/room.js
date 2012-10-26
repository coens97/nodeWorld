var waitingRoom = require('./waitingRoom'),
	gameRoom = require('./gameRoom');
this.rooms = {};

this.room = function(name,speed){
	var room = this;
	this.name = name;
	this.state = 0;//waiting
	this.pSpeed = speed;//player speed
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
		room.waitingRoom.addPlayer(this.socket,this.player);
		room.waitingRoom.broadcastRooms();
	};
	this.disconnect = function(nickname){
		console.log(nickname+" left the room "+ this.name);
		delete this.players[nickname].room;
		delete this.players[nickname];
		this.gameRoom.disconnect(nickname);
		this.waitingRoom.broadcastRooms();
	};
	this.startGames = function(){//when the game hasnt started yet and want to send evryone its ready
		this.state = 1;
		this.gameRoom.startGame();
		console.log("Everyone is ready in "+room.name+" let's start the game");
		for(var cPlayer in room.players){
			this.startGame(room.players[cPlayer]);
		}
	};
	this.stopGame = function(){
		if(this.state==1){
			this.gameRoom.stopGame();
		}
	};
	this.startGame = function(player){
		player.state = 3;
		this.gameRoom.addPlayer(player);
	};
}

/* send rooms to menu of client */
this.sendRooms = function(socket){
	var tmp = [];
	for(var Name in this.rooms){
		tmp.push({name:Name,players:Object.keys(this.rooms[Name].players).length});
	}
	socket.emit("rooms",tmp);
}