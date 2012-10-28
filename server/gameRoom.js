var sPlayer = require('./sprites/player');
var world = require('./map');
var gameWorld = world.gameWorld;

this.gameRoom = function(parent){
	var gameRoom = this;
	this.players = {};//this will have the player with socket
	this.pl = {};//this will have game player with x cordinate
	this.intervalG;//gameLoop
	this.intervalG;//sendUpdates

	this.speed = parseInt(parent.pSpeed);
	this.startGame = function(){//after evryone is ready to play the game
		this.intervalG = setInterval(this.gameLoop,1000/60);//60fps,16ms
		this.intervalU = setInterval(this.sendUpdates,1000/20);
		this.sendStartAll();//will send to all players in room the players coordinates
	};
	this.sendStartAll = function(){
		console.log("send to all players");
		for(var playerName in gameRoom.players){//loop trough all players in game
			this.sendStart(gameRoom.players[playerName]);
		}
	};
	this.sendStart = function(player){
			this.sendAllPlayers(player);//send the info
			player.socket.emit('startGame',true);//let it play
	};
	this.playerInfo = function(playerName){
		var pl = gameRoom.pl[playerName];
		return {color:pl.color,
			x:pl.x , 
			y:pl.y ,
			w:pl.w ,
			h:pl.h ,
			gX:pl.vgX,
			vY:pl.vY
			};
	};
	this.sendAllPlayers = function(player){//for players who just started the game, get the coordinates of all the players
		var tmpPlayers = {};
		for(var playerName in gameRoom.pl){//get all variables of player that matter
			tmpPlayers[playerName] = this.playerInfo(playerName);
		}
		player.socket.emit("getAllPlayers",{
				"players":tmpPlayers
		});
	};
	this.sendNewPlayers = function(nickname){//send the new player info to each client in the room
		for(var playerName in gameRoom.players){//loop trough all players in game
			if(nickname!=playerName){//the new player doesn't need to have the new player
				gameRoom.players[playerName].socket.emit("getNewPlayer",{"nickname":nickname,
													"info":this.playerInfo(nickname)});
			}
		}
	};
	this.addPlayer = function(player){
		var p = this;

		gameRoom.players[player.nickname] = player;//add player to list
		gameRoom.pl[player.nickname] = new sPlayer.player("#59E01B",704,360,gameWorld,gameRoom);//add player

		if(parent.state==1){//if game is started
			this.sendStart(player);
			gameRoom.sendNewPlayers(player.nickname);
		}
		this.getInput = function(data){
			gameRoom.pl[player.nickname].vY = data.vY;
			gameRoom.pl[player.nickname].vgX = data.vgX;
		};
		player.socket.on("changedInput",this.getInput);
		
	};
	this.disconnect = function(nickname){
		delete this.players[nickname];
		delete this.pl[nickname];
		for(var ob in gameRoom.players){//loop trough all players to send it
			gameRoom.players[ob].socket.emit("getDeletePlayer",nickname);//send them you disconnected
		}
	};
	this.stopGame = function(){
		clearInterval(this.intervalG);
		clearInterval(this.intervalU);
	};
	this.gameLoop = function(){
		//console.log("Hello from gameLoop!");
		for(var ob in gameRoom.pl){
			gameRoom.pl[ob].loop();
		}

	};
	this.sendUpdates = function(){
		//console.log("Sending updates");
		var message = {};
		for(var ob in gameRoom.pl){
			var tpl = gameRoom.pl[ob];
			message[ob] = {
				"x":tpl.x,
				"y":tpl.y,
				"vgX":tpl.vgX,
				"vY":tpl.vY
			};
		}
		for(var ob in gameRoom.players){//loop trough all players to send it
			gameRoom.players[ob].socket.emit("updatePos",message);
		}
	};
};
