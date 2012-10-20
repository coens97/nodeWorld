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
        //map : new map(gameWorld),
    };
    this.keys = {};//will save wich keys are down
    var gR = this;
    this.map = this.sprites.map;
    this.v = 0;
    this.r = 0;
    
	this.startScene = function(){

	};
	this.stopScene = function(){

	};
    this.loop = function(){

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