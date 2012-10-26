var sPlayer = require('./sprites/player');
var world = require('./map');
var gameWorld = world.gameWorld;

this.gameRoom = function(parent){
	var gameRoom = this;
	this.players = {};//this will have the player with socket
	this.pl = {};//this will have game player with x cordinate
	this.intervalG;//gameLoop
	this.intervalG;//sendUpdates
	this.startGame = function(){
		this.intervalG = setInterval(this.gameLoop,1000/60);//60fps,16ms
		this.intervalU = setInterval(this.sendUpdates,45);//45ms
	};
	this.addPlayer = function(player){
		gameRoom.players[player.nickname] = player;//add player to list
		gameRoom.pl[player.nickname] = new sPlayer.player("#59E01B",640,360,gameWorld,this);//add player
		this.sendAll = function(){
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
		this.sendAll();
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
