function waitForConnection(){
    this.sprites = {
        bg : new rect("000000",0,0,1280,720)    
    };
    this.loop = function(){
        
    };
    this.draw = function(){
        /***********
         * loop trough all sprites and draw it on canvas
         ***********/     
        for(var thisSprite in this.sprites){
            this.sprites[thisSprite].draw();       
        } 
    };
    this.mouseDown = function(x,y){
        
    };
}