this.rooms = {};

this.room = function(laps){
	this.laps = laps;
	this.players = 0;
}

this.sendRooms = function(socket){
	var tmp = [];
	for(var Name in this.rooms){
		tmp.push({name:Name,laps:this.rooms[Name].laps,players:this.rooms[Name].players});
	}
	socket.emit("rooms",tmp);
}