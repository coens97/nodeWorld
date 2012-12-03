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
        nameT : new text("#000000","Name:",40,120),
        name : new text("#000000","Name",200,120),
        checkboxes : new objectAr(),
        pSpeedT : new text("#000000","Player speed:",40,170),
        pSpeed : new text("#000000","0",370,170),
        choose : new text("#000000","Choose one",40,260),
        trolsBg : new objectArr(),//listof bg for trols
        trols : new objectArr()//listof characters to choose from
    };
    //change font sizes
    this.sprites.title.font = "66pt Arial";
    this.sprites.playerTitle.font = "40pt Arial";
    this.sprites.playerCount.font = "40pt Arial";
    this.sprites.name.font = "40pt Arial";
    this.sprites.nameT.font = "40pt Arial";
    this.sprites.pSpeedT.font = "40pt Arial";
    this.sprites.pSpeed.font = "40pt Arial";

    //initialise trolls
    for (var i = 0; i < 2; i++) {
        this.sprites.trolsBg.ar.push(new roundRect("#B8B8B8",90+i*148, 320, 84, 148, 10));  
        this.sprites.trols.ar[i] = new pImage(trollImg, 100+i*148,330, 64, 128, 0, i, 64, 128);      
     }

	this.startScene = function(){
	this.speed = 0;
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
        }else{
            for (var i = this.sprites.trolsBg.ar.length - 1; i >= 0; i--) {//check clicking on trols
                if(this.sprites.trolsBg.ar[i].checkMouse(x,y)){//if clicked on one
                    socket.emit('roomReady',{"type":i});
                }
            } 
        }
    };
    this.keyDown = function(key){
    
    };
    this.waitInfo = function(data){//when info comes in about the room
    	console.log(data);
    	var parent = game.scenes[5];
        parent.speed = data.speed;
        parent.sprites.pSpeed.string = parent.speed;
    	parent.sprites.players.ar = [];
    	parent.sprites.checkboxes.ar = [];
    	for(var i = 0; i < data.nicknames.length;i++){//loop trough nicknames
    		parent.sprites.players.ar.push(new text("#FFFFFF",data.nicknames[i][0],1000,160+i*45));//place name
    		parent.sprites.checkboxes.ar.push(new partImage("images/check.png",950,158+i*45,52,45,(data.nicknames[i][1])?1:0,0,52,45));//add checkbox
    	}
    	parent.sprites.playerCount.string = data.nicknames.length;
    	parent.sprites.name.string = data.name;
    };
    this.startGame = function(data){//whenRoom s ready to start game
        game.scenes[6].speed = parseInt(game.scenes[5].speed);
    	game.startScene(6);
    };
    socket.on('startGame',this.startGame);
    socket.on('waitInfo',this.waitInfo);
    socket.on('leaveRoom',function(){
    	game.startScene(3);
    });
}

