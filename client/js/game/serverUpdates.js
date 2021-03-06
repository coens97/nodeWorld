/**************
* Updates from server
**************/
gameRoom.onGetAllPlayers = function(data){//when you just got in room
    console.log("get all players");
    console.log(data);
    this.players.ar = {};
    for(var name in data.players){//loop trough players
        var cp = data.players[name];//current player
        this.players.ar[name] = new player(name,cp.x,cp.y,gameWorld,this);
        this.players.ar[name].type = cp.type*64;
        this.players.ar[name].vgX = cp.vgX;
        this.players.ar[name].vgY = cp.vY;
        scoreBoard.addPlayer(name);
    }
    //console.log(this.players.ar);
};
gameRoom.updatePos = function(data){
    if(data.t<this.lastPackage){//if package came to late
        console.log("Some package came to late");
        debug.toLatePackage++;
        return;
    }
    /*if(this.lastUpdate==false){//first update
        console.log("Have first update position");
        this.lastUpdate = data;
        return;
    }*/
    for(var name in data.pl){//loop trough players

        //if its the player who plays, stop
        if(name==theNickname){
            continue;
        }

        var cp = data.pl[name];//current player
        var tpl = this.players.ar[name];

        if(cp.vgX==0){//when player stopped horizontaly moving
            tpl.des.x = cp.x || tpl.x;
            tpl.des.stop = true;
        }else if(typeof(cp.vgX)!='undefined'){
           tpl.des.stop = false;
       }

        if(tpl.x<cp.x-320||tpl.x>cp.x+320){
            tpl.x = cp.x;
        }
        if(tpl.y<cp.y-320||tpl.y>cp.y+320){
            tpl.y = cp.y;
        }

       (typeof(cp.x)!='undefined')&&(tpl.eX = Math.round((cp.x-tpl.x)/6));
       tpl.vgX = cp.vgX || (cp.vgX==0?0:tpl.vgX);
       (typeof(cp.vY)!='undefined'&&typeof(cp.y)!='undefined')&&(tpl.vY = Math.round((cp.y-tpl.y)/6) + cp.vY);
	   tpl.rot = cp.rot || (cp.rot==0?0:tpl.rot);
       tpl.gun = cp.gun || (cp.gun==0?0:tpl.gun);
    }
	//save shots
	(typeof(data.shots)!='undefined')&&(this.bullets.add(data.shots));//save shots when its send	

    //leaderboard stuff
    scoreBoard.updates(data.lb);

    this.time = data.t;
    this.lastPackage = this.lastUpdate.t;
    this.udt = data.t - this.lastUpdate.t;
    this.rdt = new Date().getTime() - this.lastTime;
    this.lastTime = new Date().getTime();
    this.lastUpdate = data;
};
gameRoom.getNewPlayer = function(data){//when new player comes in room
    console.log("new player in the room");
    console.log(data);
    this.players.ar[data.nickname] = new player(data.nickname,data.info.x,data.info.y,gameWorld,this);
    this.players.ar[data.nickname].type = data.info.type*64;
    this.log.push(data.nickname+" joined the room");
    scoreBoard.addPlayer(data.nickname);
};
gameRoom.getDeletePlayer = function(data){
    delete this.players.ar[data];
    this.log.push(data+" disconnected");
    scoreBoard.removePlayer(data);
};

gameRoom.updateHealth = function(data){
    gameRoom.health = data;
};

gameRoom.respawn = function(data){
    this.player.getGun(0);
	this.player.x = data.x;
	this.player.y = data.y;
};
gameRoom.lastSend = {};//saves last update
gameRoom.sendUpdates = function(){//verzend updates naar server
    //send data
    var upd = {
       "x":this.player.x,
       "y":this.player.y,
       "vY":this.player.vY,
       "vgX":this.player.vgX,
	   "rot":this.player.rot,
       "gun":this.player.gun
    };

    //check if not resend all data to reduce bandwith
    for(var name in upd){
        if(upd[name]==this.lastSend[name]){
                delete upd[name];//remove from send package
        }
    }
    //Stuff that can multiple times be the same
    //shooting
    if(this.smg){
        this.shoot();
    }
    if(typeof(this.shot)!='undefined'){
        upd.shot = this.shot;//send shoot information
        delete this.shot;
    }

    //check if update is empty
    if(Object.keys(upd).length === 0){
        return;//stop because it doesn't need to send anything
    }

    //console.log(upd);
    socket.emit("updates",upd);//send all data to server

    for(var name in upd){//save last package
        this.lastSend[name] = upd[name] || (upd[name]==0?0:this.lastSend[name]);//The trick wont work if the value is zero
    }
};

gameRoom.killed = function(data){
    this.log.push(data[0]+" killed "+data[1]);
}
gameRoom.message = function(data){
    this.log.push(data);
}
//create callback
socket.on("getAllPlayers",function(data){gameRoom.onGetAllPlayers(data);});
socket.on("getNewPlayer",function(data){gameRoom.getNewPlayer(data);});
socket.on("getDeletePlayer",function(data){gameRoom.getDeletePlayer(data);});
socket.on("updatePos",function(data){gameRoom.updatePos(data);});
socket.on("healthChanged",function(data){gameRoom.updateHealth(data);});
socket.on("respawn",function(data){gameRoom.respawn(data);});
socket.on("killed",function(data){gameRoom.killed(data);});
socket.on("message",function(data){gameRoom.message(data);});
