function gameRoom(){
    this.sprites = {
        bg : new rect("#5BE366",0,0,1280,720),
        map : new map(gameWorld),
       	someCar : new car(0,0,600,300)
    };
    this.keys = {};//will save wich keys are down
    var gR = this;
    this.map = this.sprites.map;
    this.vx = 0;
    this.vy = 0;
    this.r = 0;
    
	this.startScene = function(){
		
	};
	this.stopScene = function(){
		
	};
    this.loop = function(){
		gR.sprites.map.x -= Math.sin(gR.map.r)*gR.vy;
    	gR.sprites.map.y -= Math.cos(gR.map.r)*gR.vy;
    	gR.map.r += gR.r;
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
    	if(typeof(this.keys[key])=='undefined'){
    		this.keys[key] = true;
    		gR.keyPress(key);
    	}
    };
    this.keyPress = function(key){
    	if(key==38){//up
    		gR.vy = -10;
    	}
    	if(key==40){//down
    		gR.vy = 10;
    	}
    	if(key==39){//right
			gR.r = -0.1;
    	}
    	if(key==37){//left
    		gR.r = 0.1;
    	}
    };
    this.keyUp = function(key){
    	delete this.keys[key];//remove from object
    	console.log("Released key:"+key);
    	if(key==38){//up
    		gR.vy = 0;
    	}
    	if(key==40){//down
    		gR.vy = 0;
    	}
    	if(key==39){//right
    		gR.r = 0;
    	}
    	if(key==37){//left
    		gR.r =0;
    	}
    };
}
