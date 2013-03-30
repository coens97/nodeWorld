var sPlayer = require('./sprites/player');
var world = require('./map');
var gameWorld = world.gameWorld;

var worldWidth = gameWorld.width*gameWorld.tilewidth;
var worldHeight = gameWorld.worldHeight*gameWorld.tileheight;



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
	this.shots = [];//current shots until they are send
	this.bullets = [];//current bullets until they hit something

	//after player died where will it respawn
	this.respawnPoints = [
		//X		Y
		960,	448,
		4800,	448,
		5632,	1408,
		5000,	2272,
		800,	2272,
		180,	1408	
	];

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
		gameRoom.pl[player.nickname] = new sPlayer.player(796,460,gameWorld,gameRoom,player.nickname);//add player

		gameRoom.respawn(player.nickname);//respawn player when it enter rooms so nor everybody spawn at the same place
		var gP = gameRoom.pl[player.nickname];

		if(parent.state==1){//if game is started
			this.sendStart(player);
			gameRoom.sendNewPlayers(player.nickname);
			player.socket.emit("updatePos",gameRoom.lastMessage);//send all the updates
		}
		this.updates = function(data){//when geting input from player
			//TODO:should totaly check if not cheating
			gP.x = data.x || gP.x;
			gP.y = data.y || gP.y;
			gP.vY = data.vY || gP.vY;
			gP.vgX = data.vgX || (data.vgX==0?0:gP.vgX);
			gP.rot = data.rot || gP.rot;
			
			//shooting
			if(!!data.shot){//when player shot
				data.shot.nickname = player.nickname;	
				gameRoom.shots.push(data.shot);		
			}
		};
		player.socket.on("updates",this.updates);
		
	};
	this.disconnect = function(nickname){
		delete this.players[nickname];
		delete this.pl[nickname];
		delete this.lastMessage.pl[nickname];
		delete this.lastMessage.lb[nickname];
		for(var ob in gameRoom.players){//loop trough all players to send it
			gameRoom.players[ob].socket.emit("getDeletePlayer",nickname);//send them you disconnected
		}
	};
	this.stopGame = function(){
		clearInterval(this.intervalG);
		clearInterval(this.intervalU);
	};

	this.isSolid = function(x,y){
		if(x>0&&y>0&&x<gameWorld.width&&y<gameWorld.height){//if player is in room
			var cor = gameWorld.layers[0].data[y*gameWorld.layers[0].width+x];
			return (typeof(cor)!='undefined'&&cor!=0);
		}else{
			return false;
		}
	};

	this.respawn = function(name){//respawn player
		var cP = gameRoom.pl[name];//current player
		var randomNumber = 2*Math.round(Math.random()*((gameRoom.respawnPoints.length/2)-1));
		var respawnX = gameRoom.respawnPoints[randomNumber];
		var respawnY = gameRoom.respawnPoints[randomNumber+1];
		gameRoom.players[name].socket.emit("respawn",{"x":respawnX,"y":respawnY});
		cP.x = respawnX;
		cP.y = respawnY;
	};

	this.checkBullets = function(){//check if bullet disapear
		for (var i = gameRoom.bullets.length - 1; i >= 0; i--) {//loop trough all bullets
			var cS = gameRoom.bullets[i];//current shot
			cS.x += Math.cos(cS.rot)*32;
			cS.y += Math.sin(cS.rot)*32;
			
			//remove bullets out of window
			if(cS.x>worldWidth||cS.x<-360||cS.y<-360||cS.y>worldHeight){
				gameRoom.bullets.splice(i,1);
			}
			//Check collision with ground
			if(gameRoom.isSolid(Math.round(cS.x/gameWorld.tilewidth),Math.round(cS.y/gameWorld.tileheight))){
				gameRoom.bullets.splice(i,1);
			}
			//check if bullet hit player
			for(var name in gameRoom.pl){
				var cP = gameRoom.pl[name];//current player
				if(cS.x>cP.x-32&&cS.x<cP.x+32&&cS.y>cP.y-62&&cS.y<cP.y+64){
					gameRoom.bullets.splice(i,1);
					//Todo:Player hit someone
					cP.health -= 10;//set damage here
					cP.healthChanged = true;
					if(cP.health<=0){//when die
						//TODO: Something when die
						cP.health = 100;
						//respawn
						gameRoom.respawn(name);
						//do leaderboard stuff				
						cP.deaths++;
						gameRoom.pl[cS.nickname].kills++;		
					}

				}
			}
		}
	};
	this.gameLoop = function(){
		//update time
		gameRoom.dt = new Date().getTime() - gameRoom.lastTime;
		gameRoom.lastTime = new Date().getTime();
		gameRoom.time += gameRoom.dt;

		for(var ob in gameRoom.pl){
			gameRoom.pl[ob].loop();
		}
		gameRoom.checkBullets();


	};

	this.lastMessage = {};
	this.sendUpdates = function(){
		//console.log("Sending updates");
		var message = {
			t : gameRoom.time+(new Date().getTime() - gameRoom.lastTime),//send server time
			pl :{},//the players info will be filled in below
			lb : {}//leaderboard
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
			message.lb[ob] = [tpl.kills,tpl.deaths];

		}

		merge(gameRoom.lastMessage,message);
		//add shots
		if(gameRoom.shots.length!=0){
			message.shots = gameRoom.shots;
			gameRoom.bullets = gameRoom.bullets.concat(gameRoom.shots);
		}
		//remove the shots
		gameRoom.shots = [];//empty the array

		for(var ob in gameRoom.players){//loop trough all players to send it
			if(gameRoom.pl[ob].healthChanged){//if players health chanched
				gameRoom.players[ob].socket.emit("healthChanged", gameRoom.pl[ob].health);
				gameRoom.pl[ob].healthChanged = false;
			}
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
    	if(source[property] instanceof Array && destination[property] instanceof Array &&destination[property].join()==source[property].join()){
    		delete source[property];
    	}else if(destination[property]==source[property]){
    		delete source[property];
    	}else{
     		destination[property] = source[property];
     	}
    }
  }
  return destination;
};
