var gameRoom = new function(){
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
}
