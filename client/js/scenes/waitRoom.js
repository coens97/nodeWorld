function waitRoom(){
    this.sprites = {
        bg : new vGrad({0:"#939393",0.1:"#DDDDDD",0.9:"#DDDDDD",1:"#939393"},0,0,1280,720),
        bg1: new vGrad({0:"#7d7e7d",1:"#2B2B2B"},0,0,1280,100),
        rightSide : new vGrad({0:"#353535",0.1:"#565656",0.9:"#565656",1:"#353535"},940,100,380,620),
        title : new text("#FFFFFF","Waiting for other players",80,0),
        back : new button("back",25,620,260,80),
        playerTitle : new text("#FFFFFF","Players",960,102),
        playerCount : new text("#FFFFFF", 1,1148,102),
        players : new objectAr(),
        ready : new button(" ready",660,620,260,80),
        name : new text("#000000","Name",40,120),
        lapsTitle : new text("#000000","laps",700,120),
        lapsCount : new text("#000000","",808,120)
    };
    //change font sizes
    this.sprites.title.font = "66pt Arial";
    this.sprites.playerTitle.font = "40pt Arial";
    this.sprites.playerCount.font = "40pt Arial";
    this.sprites.name.font = "40pt Arial";
    this.sprites.lapsTitle.font = "40pt Arial";
    this.sprites.lapsCount.font = "40pt Arial";
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
        }else if(this.sprites.ready.checkMouse(x,y)){
        	alert("ready");
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
    	parent.sprites.name.string = data.name;
    	parent.sprites.lapsCount.string = data.laps;
    }
    socket.on('waitInfo',this.waitInfo);
    socket.on('leaveRoom',function(){
    	game.startScene(3);
    });
}

