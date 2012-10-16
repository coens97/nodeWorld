function intro(){
    this.sprites = {
        bg : new rect("DDDDDD",0,0,1280,720),
		title : new image("images/title.png",145,25,0,0),//dimension of title is 921X221
		coen : new image("images/coen.png",1280,500)//dimension 620x160
    };
	this.startScene = function(){
		this.done = false;
	};
    this.loop = function(){
		//Start the animation of the title
		if(this.sprites.title.h <220){//Check if it is not zoomed in yet
			this.sprites.title.w +=18.4;//make the image bigger
			this.sprites.title.h +=4.4;//make the image higher
			this.sprites.title.x = 640 - this.sprites.title.w / 2;//puth the image exact in the middle
		}else if(this.sprites.coen.x > 500){//move the Coen sprite
			this.sprites.coen.x -= 20;
		}else if(!this.done){//animation is done now
			this.done = true;
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
        if(this.done){
			game.startScene(2);
		}
    };
}