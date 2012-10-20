function def(inp){//check if input is defined
	if(typeof(inp)!='undefined'){
		return true;
	}else{
		false;
	}
}
function gameRoom(){
    this.sprites = {
         bg : new vGrad({0:"#939393",0.1:"#DDDDDD",0.9:"#DDDDDD",1:"#939393"},0,0,1280,720),
         map : new map(gameWorld),
         player : new player(640,360)
    };
    this.keys = {};//will save wich keys are down
    var gR = this;
    this.map = this.sprites.map;
    this.player = this.sprites.player;
    
    this.pX = 0;
    this.pY = 0;
    
	this.startScene = function(){

	};
	this.stopScene = function(){

	};
	this.checkView = function(){//check player view boundries
		this.player.x = this.map.x + this.pX;
		if(this.player.x > 780){//check right bound
			this.player.x = 780;
			this.map.x = this.player.x - this.pX;
		}
		if(this.player.x <500){//check left bound
			this.player.x = 500;
			this.map.x = this.player.x - this.pX;
		}
		this.player.y = this.map.y + this.pY;
		if(this.player.y > 460){//check botto, bound
			this.player.y = 460;
			this.map.y = this.player.y - this.pY;
		}
		if(this.player.y <260){//check top bound
			this.player.y = 260;
			this.map.y = this.player.y - this.pY;
		}
	};
	this.proccesInput = function(){
		if(def(this.keys[87])){//when w is pressed
			this.pY -= 8;
		}
		if(def(this.keys[83])){//when s is pressed
			this.pY += 8;
		}
		if(def(this.keys[68])){//when d is pressed
			this.pX += 8;
		}
		if(def(this.keys[65])){//when a is pressed
			this.pX -= 8;
		}
		this.checkView();
	};
    this.loop = function(){
		this.proccesInput();
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