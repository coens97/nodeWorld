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
	}
	this.disconnect = function(nickname){
		console.log(nickname+" disconnected in a room");
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