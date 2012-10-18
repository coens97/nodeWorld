function gameRoom(){
    this.sprites = {
        bg : new vGrad({0:"#939393",0.1:"#DDDDDD",0.9:"#DDDDDD",1:"#939393"},0,0,1280,720),
       	someCar : new car(0,0,200,200)
    };
    var gR = this;
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
    	if(key==38){//up
    		gR.sprites.someCar.y -= 4;
    		gR.sprites.someCar.dir = 0;
    	}
    	if(key==40){//down
    		gR.sprites.someCar.y += 4;
    		gR.sprites.someCar.dir = 2;
    	}
    	if(key==39){//right
    		gR.sprites.someCar.x += 4;
    		gR.sprites.someCar.dir = 1;
    	}
    	if(key==37){//left
    		gR.sprites.someCar.x -= 4;
    		gR.sprites.someCar.dir = 3;
    	}
    };
}
