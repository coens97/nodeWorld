function menu(){
    this.sprites = {
    	//bg
    	bg : new vGrad({0:"#939393",0.1:"#DDDDDD",0.9:"#DDDDDD",1:"#939393"},0,0,1280,720),
        rooms : new text("#000000","Rooms",10,10),
        rightSide : new vGrad({0:"#353535",0.1:"#000000",0.9:"#000000",1:"#353535"},980,0,300,720)
    };
	this.startScene = function(){
		
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
    
    };
}
