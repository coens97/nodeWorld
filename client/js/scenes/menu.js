function menu(){
    this.sprites = {
    	//bg
    	bg : new vGrad({0:"#939393",0.1:"#DDDDDD",0.9:"#DDDDDD",1:"#939393"},0,0,980,720),
    	bg1: new vGrad({0:"#7d7e7d",1:"#2B2B2B"},0,0,1280,100),
        rooms : new text("#FFFFFF","Rooms",80,0),
        rightSide : new vGrad({0:"#353535",0.1:"#565656",0.9:"#565656",1:"#353535"},980,100,300,620),
        hostButton : new button("Host",1000,220,260,80)
    };
    this.sprites.rooms.font = "72pt Arial";
    
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
        if(this.sprites.hostButton.checkMouse(x,y)){//when host game button is pressed
        	game.startScene(4);
        }
    };
    this.keyDown = function(key){
    
    };
}
