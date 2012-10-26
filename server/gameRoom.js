var sPlayer = require('./sprites/player');
var world = require('./map');
var gameWorld = world.gameWorld;

this.gameRoom = function(parent){
	var gameRoom = this;
	this.players = {};//this will have the player with socket
	this.pl = {};//this will have game player with x cordinate
	this.intervalG;//gameLoop
	this.intervalG;//sendUpdates
	this.startGame = function(){//after evryone is ready to play the game
		this.intervalG = setInterval(this.gameLoop,1000/60);//60fps,16ms
		this.intervalU = setInterval(this.sendUpdates,45);//45ms
		this.sendStartAll();//will send to all players in room the playerrs coordinates
	};
	this.sendStartAll = function(){
		console.log("send to all players");
		for(var playerName in gameRoom.players){//loop trough all players in game
			console.log(playerName);
			this.sendStart(gameRoom.players[playerName]);
		}
	};
	this.sendStart = function(player){
			this.sendAllPlayers(player);//send the info
			player.socket.emit('startGame',true);//let it play
	};
	this.sendAllPlayers = function(player){//for players who just started the game, get the coordinates of all the players
		var tmpPlayers = {};
		for(var playerName in gameRoom.pl){//get all variables of player that matter
			var pl = gameRoom.pl[playerName];
			tmpPlayers[playerName] = {color:pl.color,
										x:pl.x , 
										y:pl.y ,
										w:pl.w ,
										h:pl.h ,
										vX:pl.vX,
										vY:pl.vY
										};
			}
			player.socket.emit("getAllPlayers",{
				"players":tmpPlayers
			});
	};
	this.addPlayer = function(player){
		gameRoom.players[player.nickname] = player;//add player to list
		gameRoom.pl[player.nickname] = new sPlayer.player("#59E01B",640,360,gameWorld,this);//add player
		if(parent.state==1){//if game is started
			this.sendStart(player);
		}
		
	};
	this.disconnect = function(nickname){
		delete this.players[nickname];
		delete this.pl[nickname];
	};
	this.stopGame = function(){
		clearInterval(this.intervalG);
		clearInterval(this.intervalU);
	};
	this.gameLoop = function(){
		//console.log("Hello from gameLoop!");
		for(var ob in this.pl){
			this.pl[ob].loop();
		}

	};
	this.sendUpdates = function(){
		//console.log("Sending updates");
	};
};
