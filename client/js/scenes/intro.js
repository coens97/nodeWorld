function intro(){
    this.sprites = {
        bg : new vGrad({0:"#939393",0.1:"#DDDDDD",0.9:"#DDDDDD",1:"#939393"},0,0,1280,720),
		title : new image("images/title.png",145,25,0,0),//dimension of title is 1095X336
		coen : new image("images/naam.png",1280,400)//dimension 612x200
    };
	this.startScene = function(){
		this.done = false;
	};
	this.stopScene = function(){
		
	};
    this.loop = function(){
        dif.d>6&&(dif.d=1);//when to long do 1 because else will pictures be to big
		//Start the animation of the title
		if(this.sprites.title.h <336){//Check if it is not zoomed in yet
			this.sprites.title.w += Math.round(21.9*dif.d);//make the image bigger
			this.sprites.title.h += Math.round(6.72*dif.d);//make the image higher
			this.sprites.title.x = 640 - this.sprites.title.w / 2;//puth the image exact in the middle
		}else if(this.sprites.coen.x > 334){//move the Coen sprite
			this.sprites.coen.x -= 20*dif.d;
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
        this.nextScene();//let's go to the other scene when it's ready
    };
    
    this.keyDown = function(key){
    	if(key == 32 || key == 13){//if enter or space is pressed
    		this.nextScene();//go to the next scene when it's ready
    	}
    };
    this.nextScene = function(){//when mouse pressed or enter or space pressed
    	if(this.done){//check if animation is over
			game.startScene(2);//go to next scene
		}
    }
}