/**************
* Updates from server
**************/
gameRoom.onGetAllPlayers = function(data){//when you just got in room
    console.log("get all players");
    this.players.ar = {};
    for(var name in data.players){//loop trough players
        var cp = data.players[name];//current player
        this.players.ar[name] = new player(name,cp.color,cp.x,cp.y,gameWorld,this);
        this.players.ar[name].vgX = cp.vgX;
        this.players.ar[name].vgY = cp.vY;
    }
};
gameRoom.updatePos = function(data){
    if(data.t<this.lastPackage){//if package came to late
        console.log("Some package came to late");
        debug.toLatePackage++;
        return;
    }
    if(this.lastUpdate==false){//first update
        this.lastUpdate = data;
        return;
    }
    this.time = data.t;
    this.lastPackage = data.t;
    this.lastTime = new Date().getTime();
    for(var name in data.pl){//loop trough players
        var cp = data.pl[name];//current player
        var tpl = this.players.ar[name];
        tpl.x = cp.x;
        tpl.y = cp.y;
        tpl.vgX = cp.vgX;
        tpl.vY = cp.vY;
    }
    this.lastUpdate = data;
};
gameRoom.getNewPlayer = function(data){//when new player comes in room
    console.log("new player in the room");
    console.log(data);
    this.players.ar[data.nickname] = new player(data.nickname,data.info.color,data.info.x,data.info.y,gameWorld,this);
    gR.log.push(data.nickname+" joined the room");
};
gameRoom.getDeletePlayer = function(data){
    delete gR.players.ar[data];
    gR.log.push(data+" disconnected");
};
//create callback
socket.on("getAllPlayers",function(data){gameRoom.onGetAllPlayers(data);});
socket.on("getNewPlayer",function(data){gameRoom.getNewPlayer(data);});
socket.on("getDeletePlayer",function(data){gameRoom.getDeletePlayer(data);});
socket.on("updatePos",function(data){gameRoom.updatePos(data);});