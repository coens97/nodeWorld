var gameRoom = new function(){
    this.sprites = {
         bg : new vGrad({0:"#87e0fd",1:"#05abe0"},0,0,1280,720),
         map : new map(gameWorld),
         players : new objectAr(),
         log : new log(),
         score : new score(),
         cursor : new cursor()
    };
    this.keys = {};//will save wich keys are down
    var gR = this;
    //sprites
    this.map = this.sprites.map;
    this.players = this.sprites.players;
    this.log = this.sprites.log;
    this.speed = 0;//player speed from server   
    /* time stuff */
    this.dt = 0;//delta time 
    this.lastTime = new Date().getTime();//last frame
    this.lastPackage = 0;
    this.udt = 0;//delta update time from server loop
    this.rdt = 0;
    this.lastUpdate = false;//contains last update from serverr


    this.time = 0;//server time
    this.player;
	this.startScene = function(){
        this.player = this.players.ar[theNickname];
        document.body.style.cursor = "none";//hide cursor
	};
	this.stopScene = function(){
        document.body.style.cursor = "default";//show cursor
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
    this.input = function(){
        if(def(this.keys[68])&&!def(this.keys[65])){//when d is pressed
            this.player.vgX =1;
            this.player.eX = this.speed;
        }else if(def(this.keys[65])&&!def(this.keys[68])){//when a is pressed
            this.player.vgX = -1;
            this.player.eX = -this.speed;
        }else{
            this.player.vgX = 0;
            this.player.eX = 0;
        }
    },
    this.loop = function(){
        //update time
        gameRoom.dt = new Date().getTime() - gameRoom.lastTime;
        gameRoom.lastTime = new Date().getTime();
        gameRoom.time += gameRoom.dt;
        
        this.input()
        //rotate gun
        this.player.rot = Math.atan2(mouse.x-(this.player.x + this.map.x),(this.player.y + this.map.y)-mouse.y)-Math.PI/2;

        (frameCounter.frame%3==0)&&this.sendUpdates();

		this.players.loop();//move players
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
}
