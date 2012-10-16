function intro(){
    this.sprites = {
        bg : new rect("DDDDDD",0,0,1280,720),
		title : new image("images/title.png",145,25,0,0)//dimension of title is 921X221
    };
    this.loop = function(){
		//Start the animation of the title
		if(this.sprites.title.h <220){//Check if it is not zoomed in yet
			this.sprites.title.w +=18.4;//make the image bigger
			this.sprites.title.h +=4.4;//make the image higher
			this.sprites.title.x = 640 - this.sprites.title.w / 2;//puth the image exact in the middle
		}
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