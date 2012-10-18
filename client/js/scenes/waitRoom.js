function waitRoom(){
    this.sprites = {
        bg : new vGrad({0:"#939393",0.1:"#DDDDDD",0.9:"#DDDDDD",1:"#939393"},0,0,1280,720),
        bg1: new vGrad({0:"#7d7e7d",1:"#2B2B2B"},0,0,1280,100),
        title : new text("#FFFFFF","Waiting for other players",80,0),
        rightSide : new vGrad({0:"#353535",0.1:"#565656",0.9:"#565656",1:"#353535"},980,100,300,620),
        back : new button("back",25,620,260,80),
        playerTitle : new text("#FFFFFF","Players",1000,102),
        playerCount : new text("#FFFFFF", 1,1178,102),
        players : new objectAr()
    };
    this.sprites.title.font = "66pt Arial";
    this.sprites.playerTitle.font = "36pt Arial";
    this.sprites.playerCount.font = "36pt Arial";
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
        if(this.sprites.back.checkMouse(x,y)){//when host game button is pressed
        	socket.emit('leaveRoom',true);
        }
    };
    this.keyDown = function(key){
    
    };
    this.waitInfo = function(data){
    	console.log(data);
    	var parent = game.scenes[5];
    	parent.sprites.players.ar = [];
    	for(var i = 0; i < data.nicknames.length;i++){//loop trough nicknames
    		parent.sprites.players.ar.push(new text("#FFFFFF",data.nicknames[i],1000,160+i*45));
    	}
    	parent.sprites.playerCount.string = data.nicknames.length+"/12";
    }
    socket.on('waitInfo',this.waitInfo);
    socket.on('leaveRoom',function(){
    	game.startScene(3);
    });
}

