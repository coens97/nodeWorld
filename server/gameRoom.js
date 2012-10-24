
this.gameRoom = function(parent){
	var gameRoom = this;
	this.players = [];
	this.interval;
	this.startGame = function(){
		this.interval = setInterval(this.gameLoop,1000/60);
	};
	this.addPlayer = function(player){
		
	};
	this.stopGame = function(){
		clearInterval(this.interval);
	};
	this.gameLoop = function(){
		//console.log("Hello from gameLoop!");
	};
};
