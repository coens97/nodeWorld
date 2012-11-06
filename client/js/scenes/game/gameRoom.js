function gameRoom(){
    this.sprites = {
         bg : new vGrad({0:"#87e0fd",1:"#05abe0"},0,0,1280,720),
         map : new map(gameWorld),
         players : new objectAr(),
         log : new log()
    };
    this.keys = {};//will save wich keys are down
    var gR = this;
    //sprites
    this.map = this.sprites.map;
    this.players = this.sprites.players;
    this.log = this.sprites.log;

    this.speed = 0;//player speed from server   
    this.time = 0;
	this.startScene = function(){
        this.player = this.players.ar[theNickname];
	};
	this.stopScene = function(){

	};

    //let the view follow the player
	this.checkView = function(){//check player view boundries
		//let the view follow the player
		if(this.player.x + this.map.x> 780){//check right bound
			this.map.x = 780-this.player.x;
		}else if(this.player.x + this.map.x< 500){//check right bound
			this.map.x = 500-this.player.x;
		}
		if(this.player.y + this.map.y > 460){//check right bound
			this.map.y = 460 - this.player.y;
		}else if(this.player.y + this.map.y < 260){//check right bound
			this.map.y = 260 - this.player.y;
		}
	};
    this.loop = function(){
		this.players.loop();//move circle
        this.checkView();
    };
    this.draw = function(){
        /***********
         * loop trough all sprite and draw it on canvas
         ***********/     
        for(var thisSprite in this.sprites){
            this.sprites[thisSprite].draw();       
        } 
    };
    //for touch screen
    if(touch){
        document.getElementById("bleft").addEventListener('touchstart', function(event) {//when left is pressed
            if(game.currentScene==6){
                gR.player.vgX = -1;
                socket.emit("changedInput",{"vgX":gR.player.vgX,
                                        "vY":gR.player.vY});
            }
        },false);
        document.getElementById("bright").addEventListener('touchstart', function(event) {//when right is pressed
            if(game.currentScene==6){
                gR.player.vgX = 1;
                socket.emit("changedInput",{"vgX":gR.player.vgX,
                                        "vY":gR.player.vY});
            }
        },false);
        document.getElementById("bup").addEventListener('touchstart', function(event) {//when up is pressed
            if(game.currentScene==6){
                if(gR.player.onGround!=2){
                    gR.player.vY = -20;
                    socket.emit("changedInput",{"vgX":gR.player.vgX,
                                        "vY":gR.player.vY});
                    gR.player.onGround++;
                }
            }
        },false);
        document.getElementById("bleft").addEventListener('touchend', function(event) {//when left is pressed
            if(game.currentScene==6){
                gR.player.vgX = 0;
                socket.emit("changedInput",{"vgX":gR.player.vgX,
                                        "vY":gR.player.vY});
            }
        },false);
        document.getElementById("bright").addEventListener('touchend', function(event) {//when right is pressed
            if(game.currentScene==6){
                gR.player.vgX = 0;
                socket.emit("changedInput",{"vgX":gR.player.vgX,
                                        "vY":gR.player.vY});
            }
        },false);
    }//end touch
    /***updates from sever ***/
    this.onGetAllPlayers = function(data){//when you just got in room
        console.log("get all players");
        gR.players.ar = {};
        for(var name in data.players){//loop trough players
            var cp = data.players[name];//current player
            gR.players.ar[name] = new player(name,cp.color,cp.x,cp.y,gameWorld,gR);
            gR.players.ar[name].vgX = cp.vgX;
            gR.players.ar[name].vgY = cp.vY;
        }
    };
    this.updatePos = function(data){
        gR.time = data.t;
        for(var name in data.pl){//loop trough players
            var cp = data.pl[name];//current player
            var tpl = gR.players.ar[name];
            tpl.x = cp.x;
            tpl.y = cp.y;
            tpl.vgX = cp.vgX;
            tpl.vY = cp.vY;
        }
    };
    this.getNewPlayer = function(data){//when new player comes in room
        console.log("new player in the room");
        console.log(data);
        gR.players.ar[data.nickname] = new player(data.nickname,data.info.color,data.info.x,data.info.y,gameWorld,gR);
        gR.log.push(data.nickname+" joined the room");
    };
    this.getDeletePlayer = function(data){
        delete gR.players.ar[data];
        gR.log.push(data+" disconnected");
    };
    socket.on("getAllPlayers",this.onGetAllPlayers);
    socket.on("getNewPlayer",this.getNewPlayer);
    socket.on("getDeletePlayer",this.getDeletePlayer);
    socket.on("updatePos",this.updatePos);

}
requirejs(["scenes/game/processInput"
    ]);