this.waitingRoom = function(parent){
	var wait = this;
	/*udates client*/
	this.addPlayer = function(socket,player){
		this.roomReady = function(data){//when player press ready
			console.log(now()+player.nickname+" is ready to play the game");
			player.ready = true;
			player.type = data.type||0;
			wait.broadcastRooms();
			if(parent.state==0){//if game hasnt start yeu
				wait.checkReady();
			}else{//add to room
				parent.startGame(player);
			}
		}
		socket.on('roomReady',this.roomReady);
	};
	this.checkReady = function(){
		if(Object.keys(parent.players).length>1){//check if there are more then one player
			var done = true;
			for(var cPlayer in parent.players){//loop trough playerrs of room
				if(!parent.players[cPlayer].ready){//check if there ready
					done = false;
				}
			}
			if(done){
				parent.startGames();
			}
		}
	};
	this.sendInfo = function(socket){
		var playerNames = [];
		for(var pl in parent.players){//loop trough object
			playerNames.push([pl,parent.players[pl].ready]);
		}
		socket.emit("waitInfo",{name:parent.name,speed:parent.pSpeed,nicknames:playerNames});//updates player
	};
	this.broadcastRooms = function(){//send to all the users the room info
		for(var cPlayer in parent.players){//loop trough players
			if(parent.players[cPlayer].state == 2){
				this.sendInfo(parent.players[cPlayer].socket);
			}
		};
	};
}
