/**************
* Updates from server
**************/
gameRoom.prototype.onGetAllPlayers = function(data){//when you just got in room
    console.log("get all players");
    this.players.ar = {};
    for(var name in data.players){//loop trough players
        var cp = data.players[name];//current player
        this.players.ar[name] = new player(name,cp.color,cp.x,cp.y,gameWorld,this);
        this.players.ar[name].vgX = cp.vgX;
        this.players.ar[name].vgY = cp.vY;
    }
};
gameRoom.prototype.updatePos = function(data){
    this.time = data.t;
    for(var name in data.pl){//loop trough players
        var cp = data.pl[name];//current player
        var tpl = this.players.ar[name];
        tpl.x = cp.x;
        tpl.y = cp.y;
        tpl.vgX = cp.vgX;
        tpl.vY = cp.vY;
    }
};
gameRoom.prototype.getNewPlayer = function(data){//when new player comes in room
    console.log("new player in the room");
    console.log(data);
    this.players.ar[data.nickname] = new player(data.nickname,data.info.color,data.info.x,data.info.y,gameWorld,this);
    gR.log.push(data.nickname+" joined the room");
};
gameRoom.prototype.getDeletePlayer = function(data){
    delete gR.players.ar[data];
    gR.log.push(data+" disconnected");
};