function intro(){
    this.sprites = {
        bg : new rect("DDDDDD",0,0,1280,720),
		title : new image("images/title.png",145,25,990,220)
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