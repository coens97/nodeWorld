this.waitingRoom = function(parent){
	/*udates client*/
	this.sendInfo = function(socket){
		var playerNames = [];
		for(var pl in parent.players){//loop trough object
			playerNames.push(pl);
		}
		socket.emit("waitInfo",{name:parent.name,laps:parent.laps,nicknames:playerNames});//updates player
	};
	this.broadcastRooms = function(){//send to all the users the room info
		for(var cPlayer in parent.players){//loop trough players
			this.sendInfo(parent.players[cPlayer].socket);
		};
	};
}
