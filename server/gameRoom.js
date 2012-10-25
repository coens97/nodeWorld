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
		this.players[player.name] = player;//add player to list
		this.pl[player.name] = new sPlayer.player("#59E01B",640,360,gameWorld,this);
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
