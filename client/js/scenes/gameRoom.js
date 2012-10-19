function def(inp){//check if input is defined
	if(typeof(inp)!='undefined'){
		return true;
	}else{
		false;
	}
}
function gameRoom(){
    this.sprites = {
        bg : new rect("#5BE366",0,0,1280,720),
        map : new map(gameWorld),
       	someCar : new car(0,0,600,300)
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
	this.proccesInput = function(){
		if(def(gR.keys[38])){//check if up is pressed
    		var maxS = 18;
    		if(gR.v<maxS){
    			gR.v += 1;
    		}
    		if(gR.v>maxS){
    			gR.v = maxS;
    		}
    	}else{
    		if(def(gR.keys[40])){//if down is pressed
    			var minS = -10;
    			if(gR.v>minS){
    				gR.v -= 1;
	    		}
    			if(gR.v<minS){
	    			gR.v = minS;
    			}
    		}else{
    			if(gR.v>0){
    				gR.v -= 0.5;
    			}else if(gR.v<0){
    				gR.v += 0.5; 
    			}
    		}
    	}
    	gR.r = 0;
    	if(def(gR.keys[39])&&gR.v!=0){//when right is pressed
    		gR.r = Math.PI*-0.02;
    	}
    	if(def(gR.keys[37])&&gR.v!=0){//when left is pressed
    		gR.r = Math.PI*0.02;
    	}
		gR.sprites.map.x += Math.sin(gR.map.r)*gR.v;
    	gR.sprites.map.y += Math.cos(gR.map.r)*gR.v;
    	gR.map.r += gR.r;
	};
    this.loop = function(){
    	gR.proccesInput();
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