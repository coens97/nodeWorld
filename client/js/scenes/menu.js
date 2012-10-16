function menu(){
    this.sprites = {
        bg : new rect("DDDDDD",0,0,1280,720),
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
}
