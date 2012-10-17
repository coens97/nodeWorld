this.rooms = {};

this.room = function(laps){
	this.laps = laps;
	this.players = {};
}

this.sendRooms = function(socket){
	var tmp = [];
	for(var Name in this.rooms){
		tmp.push({name:Name,laps:this.rooms[Name].laps,players:Object.keys(this.rooms[Name].players).length});
	}
	socket.emit("rooms",tmp);
}