function hostGame(){
    this.sprites = {
        bg : new vGrad({0:"#939393",0.1:"#DDDDDD",0.9:"#DDDDDD",1:"#939393"},0,0,1280,720),
        bg1: new vGrad({0:"#7d7e7d",1:"#2B2B2B"},0,0,1280,100),
        title : new text("#FFFFFF","Host game",80,0),
        back : new button("back",25,620,260,80)
    };
    this.sprites.title.font = "66pt Arial";
	this.startScene = function(){
		document.getElementById("host").style.display = "block";
		document.getElementById("hostSubmit").addEventListener('click', this.sendGame , false);
	};
	this.stopScene = function(){
		document.getElementById("host").style.display = "none";
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
        	game.startScene(3);
        }
    };
    this.keyDown = function(key){
    
    };
    this.sendGame = function(){
    	var hName = document.getElementById("hname").value;
        var hSpeed = document.getElementById("speed").value;
    	socket.emit("hostGame",{name:hName,speed:hSpeed});//send to server
    };
    socket.on('hostGame',function(data){
    	if(data==0){
    		alert("Somebody else already used this name");
    	}else{
    		game.startScene(5);
    	}
    });
}
