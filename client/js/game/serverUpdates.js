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
        if(name==theNickname){
            continue;
        }
        var cp = data.pl[name];//current player
        var lp = this.lastUpdate.pl[name]||cp;//current player from last update
        var tpl = this.players.ar[name];

        if(cp.vgX==0){//when player stopped horizontaly moving
            tpl.des.x = cp.x;
            tpl.des.stop = true;
        }else{
            tpl.des.stop = false;
        }
        tpl.eX = Math.round((cp.x-tpl.x)/6);
        //tpl.x = lp.x;
        //tpl.y = cp.y;
        tpl.vgX = cp.vgX;
        tpl.vY = Math.round((cp.y-tpl.y)/6) + cp.vY;
	tpl.rot = cp.rot;
    }
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
gameRoom.sendUpdates = function(){//verzend updates naar server
    var upd = {};
    upd.pos = {
        "x":this.player.x,
        "y":this.player.y,
        "vY":this.player.vY,
        "vgX":this.player.vgX,
	"rot":this.player.rot
    };
    socket.emit("updates",upd);
};
//create callback
socket.on("getAllPlayers",function(data){gameRoom.onGetAllPlayers(data);});
socket.on("getNewPlayer",function(data){gameRoom.getNewPlayer(data);});
socket.on("getDeletePlayer",function(data){gameRoom.getDeletePlayer(data);});
socket.on("updatePos",function(data){gameRoom.updatePos(data);});