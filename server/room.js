this.rooms = {};

this.room = function(laps){
	this.state = 0;//waiting
	this.laps = laps;
	this.players = {};
	this.addPlayer = function(nickname,player){//when player goes to room
		this.players[nickname] = player;
		this.player = this.players[nickname];
		this.player.state = 2;//scene state
	};
}

this.sendRooms = function(socket){
	var tmp = [];
	for(var Name in this.rooms){
		tmp.push({name:Name,laps:this.rooms[Name].laps,players:Object.keys(this.rooms[Name].players).length});
	}
	socket.emit("rooms",tmp);
}