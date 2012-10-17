function waitForConnection(){
    this.sprites = {
        bg : new vGrad({0:"#939393",0.1:"#DDDDDD",0.9:"#DDDDDD",1:"#939393"},0,0,1280,720),
        loading : new image("images/load.png",584,304)
    };
	this.startScene = function(){
		
	};
	this.stopScene = function(){
		
	};
    this.loop = function(){
        if(gotConnection){
			if(typeof game != 'undefined'){//if there is connection wait until game is loaded
				game.newConnection();
			}
		}
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
