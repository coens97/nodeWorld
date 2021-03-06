function nickname(){
    this.sprites = {
        bg : new vGrad({0:"#939393",0.1:"#DDDDDD",0.9:"#DDDDDD",1:"#939393"},0,0,1280,720),
    };
	this.startScene = function(){
		document.getElementById("nickname").style.display = "block";
		document.getElementById("button").addEventListener('click', this.sendNickname , false);
	};
	this.stopScene = function(){
		document.getElementById("nickname").style.display = "none";
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
    this.mouseDown = function(x,y){};
    
    this.keyDown = function(key){
    	if(key == 13){//if enter pressed
    		this.sendNickname();
    	}
    };
    
    this.sendNickname = function(){
    	var value = document.getElementById("inputName").value;
    	(value == "")&&(value = "nameless");
    	console.log("Send to server the nickname:"+value);
    	socket.emit("nickname",value);
        theNickname = value;
    };
}
socket.on("go",function(data){
	if(data == 0){
		alert("Hey, be more creative and think of another nickname. Someone already used it");
	}else{
		game.startScene(3);
	}
});
