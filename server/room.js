this.rooms = {};

this.room = function(name,laps){
	this.name = name;
	this.state = 0;//waiting
	this.laps = laps;
	this.players = {};
	this.addPlayer = function(nickname,player,parent){//when player goes to room
		//asign variables
		this.players[nickname] = player;
		this.player = this.players[nickname];
		this.socket = this.player.socket;
		this.player.state = 2;//scene state
		this.player.room = parent;
		//functions here
		this.broadcastRooms = function(){//send to all the users the room info
			for(var cPlayer in this.player.room.players){//loop trough players
				this.sendInfo(this.player.room.players[cPlayer].socket);
			};
		};
		
		this.sendInfo = function(socket){
			var playerNames = [];
			for(var pl in this.players){//loop trough object
				playerNames.push(pl);
			}
			socket.emit("waitInfo",{name:this.name,laps:this.laps,nicknames:playerNames});
		};
		this.broadcastRooms();
	};
	this.disconnect = function(nickname){
		console.log(nickname+" left the room "+ this.name);
		delete this.players[nickname];
	};
}

this.sendRooms = function(socket){
	var tmp = [];
	for(var Name in this.rooms){
		tmp.push({name:Name,laps:this.rooms[Name].laps,players:Object.keys(this.rooms[Name].players).length});
	}
	socket.emit("rooms",tmp);
}