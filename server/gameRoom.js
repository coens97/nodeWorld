
this.gameRoom = function(parent){
	var gameRoom = this;
	this.players = [];
	this.intervalG;//gameLoop
	this.intervalG;//sendUpdates
	this.startGame = function(){
		this.intervalG = setInterval(this.gameLoop,1000/60);//60fps,16ms
		this.intervalU = setInterval(this.sendUpdates,45);//45ms
	};
	this.addPlayer = function(player){
		
	};
	this.stopGame = function(){
		clearInterval(this.intervalG);
		clearInterval(this.intervalU);
	};
	this.gameLoop = function(){
		//console.log("Hello from gameLoop!");
	};
	this.sendUpdates = function(){
		//console.log("Sending updates");
	};
};
