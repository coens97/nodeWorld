function gameRoom(){
    this.sprites = {
         bg : new vGrad({0:"#87e0fd",1:"#05abe0"},0,0,1280,720),
         map : new map(gameWorld),
         player : new player(640,360,gameWorld,this)
    };
    this.keys = {};//will save wich keys are down
    var gR = this;
    this.map = this.sprites.map;
    this.player = this.sprites.player;
    
    this.pX = 256;
    this.pY = 0;    
	this.startScene = function(){

	};
	this.stopScene = function(){

	};
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
	this.proccesInput = function(){
		this.player.vX = 0;
		this.player.vY = 0;
		if(def(this.keys[87])){//when w is pressed
			//if(this.player.onGround){
			this.player.vY = -8;
			//}
		}
		if(def(this.keys[83])){
			this.player.vY = 8;
		}
		if(def(this.keys[68])&&!def(this.keys[65])){//when d is pressed
			this.player.vX = 8;
		}
		if(def(this.keys[65])&&!def(this.keys[68])){//when a is pressed
			this.player.vX = -8;
		}
		this.checkView();
	};
    this.loop = function(){
		this.proccesInput();//check keyboard input
		this.player.loop();//move circle
    };
    this.draw = function(){
        /***********
         * loop trough all sprite and draw it on canvas
         ***********/     
        for(var thisSprite in this.sprites){
            this.sprites[thisSprite].draw();       
        } 
    };
    this.mouseDown = function(x,y){
        
    };
    this.keyDown = function(key){
    	if(!def(this.keys[key])){
    		this.keys[key] = true;
    		gR.keyPress(key);
    	}
    };
    this.keyPress = function(key){

    };
    this.keyUp = function(key){
    	delete this.keys[key];//remove from object
    	console.log("Released key:"+key);
    };
}