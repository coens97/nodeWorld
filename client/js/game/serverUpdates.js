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
    }
    console.log(this.players.ar);
};
gameRoom.updatePos = function(data){
    if(data.t<this.lastPackage){//if package came to late
        console.log("Some package came to late");
        debug.toLatePackage++;
        return;
    }
    if(this.lastUpdate==false){//first update
        console.log("Have first update position");
        this.lastUpdate = data;
        return;
    }
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
       (typeof(cp.x)!='undefined')&&(tpl.eX = Math.round((cp.x-tpl.x)/6));
       //tpl.x = cp.x || (cp.x==0?0:tpl.x);
       //tpl.y = cp.y || (cp.y==0?0:tpl.y);
       tpl.vgX = cp.vgX || (cp.vgX==0?0:tpl.vgX);
       (typeof(cp.vY)!='undefined'&&typeof(cp.y)!='undefined')&&(tpl.vY = Math.round((cp.y-tpl.y)/6) + cp.vY);
	   tpl.rot = cp.rot || (cp.rot==0?0:tpl.rot);
    }
	//save shots
	(typeof(data.shots)!='undefined')&&(this.bullets.add(data.shots));//save shots when its send	

    console.log(data);

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
};
gameRoom.getDeletePlayer = function(data){
    delete this.players.ar[data];
    this.log.push(data+" disconnected");
};

gameRoom.lastSend = {};//saves last update
gameRoom.sendUpdates = function(){//verzend updates naar server
    //send data
    var upd = {
       "x":this.player.x,
       "y":this.player.y,
       "vY":this.player.vY,
       "vgX":this.player.vgX,
	   "rot":this.player.rot
    };

    //check if not resend all data to reduce bandwith
    for(var name in upd){
        if(upd[name]==this.lastSend[name]){
                delete upd[name];//remove from send package
        }
    }
    //Stuff that can multiple times be the same
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
//create callback
socket.on("getAllPlayers",function(data){gameRoom.onGetAllPlayers(data);});
socket.on("getNewPlayer",function(data){gameRoom.getNewPlayer(data);});
socket.on("getDeletePlayer",function(data){gameRoom.getDeletePlayer(data);});
socket.on("updatePos",function(data){gameRoom.updatePos(data);});
