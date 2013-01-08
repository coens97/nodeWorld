var sPlayer = require('./sprites/player');
var world = require('./map');
var gameWorld = world.gameWorld;

this.gameRoom = function(parent){
	var gameRoom = this;
	this.players = {};//this will have the player with socket
	this.pl = {};//this will have game player with x cordinate
	this.intervalG;//gameLoop
	this.intervalG;//sendUpdates

	/* time stuff */
	this.dt = 0;//delta time 
	this.lastTime = new Date().getTime();//last frame
	this.time = 0;//server time

	//shooting variables
	//this.shots = [];//save shots

	this.speed = parseInt(parent.pSpeed);
	this.startGame = function(){//after evryone is ready to play the game
		this.intervalG = setInterval(this.gameLoop,1000/60);//60fps,16ms
		this.intervalU = setInterval(this.sendUpdates,1000/20);
		this.sendStartAll();//will send to all players in room the players coordinates
	};
	this.sendStartAll = function(){
		console.log(now()+"send to all players");
		for(var playerName in gameRoom.players){//loop trough all players in game
			this.sendStart(gameRoom.players[playerName]);
		}
	};
	this.sendStart = function(player){
			this.sendAllPlayers(player);//send the info
			player.socket.emit('startGame',true);//let it play
	};
	this.playerInfo = function(playerName){
		var pl = gameRoom.pl[playerName],
			player = gameRoom.players[playerName];
		return {
			"type": player.type,
			"x":pl.x , 
			"y":pl.y ,
			"w":pl.w ,
			"h":pl.h ,
			"vgX":pl.vgX,
			"vY":pl.vY
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
		gameRoom.pl[player.nickname] = new sPlayer.player(796,460,gameWorld,gameRoom);//add player

		var gP = gameRoom.pl[player.nickname];

		if(parent.state==1){//if game is started
			this.sendStart(player);
			gameRoom.sendNewPlayers(player.nickname);
		}
		this.updates = function(data){//when geting input from player
			//TODO:should totaly check if not cheating
			gP.x = data.x || gP.x;
			gP.y = data.y || gP.y;
			gP.vY = data.vY || gP.vY;
			gP.vgX = data.vgX || (data.vgX==0?0:gP.vgX);
			gP.rot = data.rot || gP.rot;
			
			//shooting
			if(typeof(data.shot)!='undefined'){//when player shot
				//gameRoom.shots.push(data.shot);		
			}
		};
		player.socket.on("updates",this.updates);
		
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
		//update time
		gameRoom.dt = new Date().getTime() - gameRoom.lastTime;
		gameRoom.lastTime = new Date().getTime();
		gameRoom.time += gameRoom.dt;
		//console.log("Hello from gameLoop!");
		for(var ob in gameRoom.pl){
			gameRoom.pl[ob].loop();
		}

	};

	this.lastMessage = {};
	this.sendUpdates = function(){
		//console.log("Sending updates");
		var message = {
			t : gameRoom.time+(new Date().getTime() - gameRoom.lastTime),//send server time
			pl :{},//the players info will be filled in below
		//	shots :  []//send shots
		};

		for(var ob in gameRoom.pl){//put all the players in message
			var tpl = gameRoom.pl[ob];
			message.pl[ob] = {
				"x":tpl.x,
				"y":tpl.y,
				"vgX":tpl.vgX,
				"vY":tpl.vY,
				"rot":tpl.rot
			};
		}

		merge(gameRoom.lastMessage,message);
		
		//add shots
		//message.shots = gameRoom.shots;

		for(var ob in gameRoom.players){//loop trough all players to send it
			gameRoom.players[ob].socket.emit("updatePos",message);
		}
	};
};

var merge = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
    	arguments.callee(destination[property], source[property]);
    	//check if object is empty
    	if(Object.keys(source[property]).length === 0){
    		delete source[property];
    	}
    } else {
    	if(destination[property]==source[property]){
    		delete source[property];
    	}else{
     		destination[property] = source[property];
     	}
    }
  }
  return destination;
};
