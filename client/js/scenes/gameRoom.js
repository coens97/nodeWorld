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
    
	this.startScene = function(){

	};
	this.stopScene = function(){

	};
	this.proccesInput = function(){
		if(def(this.keys[87])){//when w is pressed
			this.map.y += 8;
		}
		if(def(this.keys[83])){//when s is pressed
			this.map.y -= 8;
		}
		if(def(this.keys[68])){//when d is pressed
			this.map.x -= 8;
		}
		if(def(this.keys[65])){//when a is pressed
			this.map.x += 8;
		}
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