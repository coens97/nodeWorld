this.waitingRoom = function(parent){
	var wait = this;
	/*udates client*/
	this.addPlayer = function(socket,player){
		this.roomReady = function(data){//when player press ready
			console.log(player.nickname+" is ready to play the game");
			player.ready = true;
			wait.broadcastRooms();
		}
		socket.on('roomReady',this.roomReady);
	};
	this.sendInfo = function(socket){
		var playerNames = [];
		for(var pl in parent.players){//loop trough object
			playerNames.push([pl,parent.players[pl].ready]);
		}
		socket.emit("waitInfo",{name:parent.name,laps:parent.laps,nicknames:playerNames});//updates player
	};
	this.broadcastRooms = function(){//send to all the users the room info
		for(var cPlayer in parent.players){//loop trough players
			this.sendInfo(parent.players[cPlayer].socket);
		};
	};
}
