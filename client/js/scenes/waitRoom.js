function waitRoom(){
    this.sprites = {
        bg : new vGrad({0:"#939393",0.1:"#DDDDDD",0.9:"#DDDDDD",1:"#939393"},0,0,1280,720),
        bg1: new vGrad({0:"#7d7e7d",1:"#2B2B2B"},0,0,1280,100),
        title : new text("#FFFFFF","Waiting for other players",80,0)
    };
    this.sprites.title.font = "66pt Arial";
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
    
    };
    socket.on('waitInfo',function(data){
    	console.log(data);
    });
}
